import { prisma } from "../config/db.js";
import { ApiError } from "../utils/apiError.js";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import crypto from "crypto";
import { config } from "../config/config.js";
import { emitPaymentConfirmed, emitNotification } from "../lib/socketManager.js";
import { notificationRepository } from "../repositories/notification.repository.js";

interface CreateOrderInput {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
}

interface VerifyPaymentInput {
  bookingId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export class PaymentService {
  /**
   * Create a mock Razorpay order and Payment record
   */
  async createOrder(input: CreateOrderInput) {
    const booking = await prisma.booking.findUnique({
      where: { id: input.bookingId },
      include: { payment: true },
    });

    if (!booking) throw new ApiError(404, "Booking not found.");
    if (booking.payment) throw new ApiError(409, "Payment already exists for this booking.");

    // Mock Razorpay order ID
    const mockRazorpayOrderId = `order_${crypto.randomBytes(10).toString("hex")}`;

    // Create payment record in PENDING state
    const payment = await prisma.payment.create({
      data: {
        bookingId: input.bookingId,
        amount: input.amount,
        method: input.method,
        status: PaymentStatus.PENDING,
        razorpayId: mockRazorpayOrderId,
      },
    });

    return {
      orderId: mockRazorpayOrderId,
      amount: input.amount,
      currency: "INR",
      payment,
    };
  }

  /**
   * Verify Razorpay webhook signature (HMAC-SHA256)
   */
  async verifyPayment(input: VerifyPaymentInput) {
    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = input;

    // HMAC verification — use Razorpay secret from env
    const razorpaySecret = (config as Record<string, string>)["RAZORPAY_KEY_SECRET"] || "mock_razorpay_secret";
    const expectedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    // In mock mode, skip signature validation
    const isMockMode = razorpaySecret === "mock_razorpay_secret";
    if (!isMockMode && expectedSignature !== razorpaySignature) {
      throw new ApiError(400, "Payment signature verification failed.");
    }

    const payment = await prisma.payment.findUnique({ where: { bookingId } });
    if (!payment) throw new ApiError(404, "Payment record not found.");

    // Mark payment SUCCESS
    const [updatedPayment] = await prisma.$transaction([
      prisma.payment.update({
        where: { bookingId },
        data: {
          status: PaymentStatus.SUCCESS,
          razorpayId: razorpayPaymentId,
        },
      }),
      prisma.booking.update({
        where: { id: bookingId },
        data: { status: "CONFIRMED" },
      }),
      prisma.transaction.create({
        data: {
          bookingId,
          amount: payment.amount,
          type: "payment",
          gatewayRef: razorpayPaymentId,
          status: "success",
        },
      }),
    ]);

    // Get booking to know who the renter is
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: { userId: true, vehicle: { select: { name: true } } },
    });

    if (booking) {
      // DB notification
      const payNotif = await notificationRepository.createNotification({
        userId: booking.userId,
        type: "PAYMENT_SUCCESS",
        message: `Payment of ₹${payment.amount.toLocaleString("en-IN")} confirmed for "${booking.vehicle.name}". Your booking is confirmed!`,
      });

      // 🔌 Real-time: push payment confirmation instantly
      emitPaymentConfirmed(booking.userId, {
        bookingId,
        amount: payment.amount,
        razorpayPaymentId,
        vehicleName: booking.vehicle.name,
      });
      emitNotification(booking.userId, {
        id: payNotif.id,
        type: payNotif.type,
        message: payNotif.message,
        createdAt: payNotif.createdAt,
        isRead: payNotif.isRead,
      });
    }

    return updatedPayment;
  }

  /**
   * Process a refund
   */
  async processRefund(bookingId: string, amount: number) {
    const payment = await prisma.payment.findUnique({ where: { bookingId } });
    if (!payment) throw new ApiError(404, "Payment not found.");
    if (payment.status !== PaymentStatus.SUCCESS) {
      throw new ApiError(400, "Cannot refund a payment that has not succeeded.");
    }

    const mockRefundId = `rfnd_${crypto.randomBytes(8).toString("hex")}`;

    await prisma.$transaction([
      prisma.payment.update({
        where: { bookingId },
        data: { status: PaymentStatus.REFUNDED },
      }),
      prisma.transaction.create({
        data: {
          bookingId,
          amount,
          type: "refund",
          gatewayRef: mockRefundId,
          status: "success",
        },
      }),
    ]);

    return { refundId: mockRefundId, amount, status: "REFUNDED" };
  }

  /**
   * Get payment for a booking
   */
  async getPaymentByBooking(bookingId: string) {
    const payment = await prisma.payment.findUnique({
      where: { bookingId },
      include: { booking: { select: { userId: true, vehicle: { select: { ownerId: true } } } } },
    });
    if (!payment) throw new ApiError(404, "Payment not found.");
    return payment;
  }
}

export const paymentService = new PaymentService();
export default paymentService;
