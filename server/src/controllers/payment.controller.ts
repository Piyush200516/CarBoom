import { Request, Response } from "express";
import { paymentService } from "../services/payment.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { PaymentMethod } from "@prisma/client";

export class PaymentController {
  /**
   * POST /api/v1/payments/create-order — Create Razorpay order
   */
  createOrder = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const { bookingId, amount, method } = req.body;
    const result = await paymentService.createOrder({
      bookingId,
      amount: Number(amount),
      method: (method as PaymentMethod) || PaymentMethod.RAZORPAY,
    });
    res.status(201).json(new ApiResponse(201, result, "Payment order created."));
  });

  /**
   * POST /api/v1/payments/verify — Verify Razorpay webhook/callback
   */
  verifyPayment = asyncHandler(async (req: Request, res: Response) => {
    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const payment = await paymentService.verifyPayment({
      bookingId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });
    res.status(200).json(new ApiResponse(200, { payment }, "Payment verified and confirmed."));
  });

  /**
   * POST /api/v1/payments/refund — Process refund
   */
  processRefund = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const { bookingId, amount } = req.body;
    const result = await paymentService.processRefund(bookingId, Number(amount));
    res.status(200).json(new ApiResponse(200, result, "Refund processed successfully."));
  });

  /**
   * GET /api/v1/payments/booking/:bookingId — Get payment for a booking
   */
  getPaymentByBooking = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const bookingId = req.params.bookingId as string;
    const payment = await paymentService.getPaymentByBooking(bookingId);
    res.status(200).json(new ApiResponse(200, { payment }, "Payment fetched."));
  });
}

export const paymentController = new PaymentController();
export default paymentController;
