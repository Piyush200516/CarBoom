import { bookingRepository } from "../repositories/booking.repository.js";
import { notificationRepository } from "../repositories/notification.repository.js";
import { vehicleRepository } from "../repositories/vehicle.repository.js";
import { ApiError } from "../utils/apiError.js";
import { prisma } from "../config/db.js";
import { BookingStatus, BookingDuration, PaymentStatus } from "@prisma/client";

interface CreateBookingInput {
  userId: string;
  vehicleId: string;
  startTime: Date;
  endTime: Date;
  couponCode?: string;
}

export class BookingService {
  /**
   * Calculate pricing for a vehicle booking
   */
  async calculatePrice(vehicleId: string, startTime: Date, endTime: Date, couponCode?: string) {
    const vehicle = await vehicleRepository.findVehicleById(vehicleId);
    if (!vehicle) throw new ApiError(404, "Vehicle not found.");

    const diffMs = endTime.getTime() - startTime.getTime();
    if (diffMs <= 0) throw new ApiError(400, "Return date must be after pickup date.");

    const hours = Math.ceil(diffMs / (1000 * 60 * 60));
    const days = Math.ceil(hours / 24);
    const weeks = Math.ceil(days / 7);

    let duration: BookingDuration;
    let baseAmount: number;

    if (hours < 24) {
      duration = BookingDuration.HOURLY;
      baseAmount = hours * vehicle.pricePerHour;
    } else if (days < 7) {
      duration = BookingDuration.DAILY;
      baseAmount = days * vehicle.pricePerDay;
    } else {
      duration = BookingDuration.WEEKLY;
      baseAmount = weeks * vehicle.pricePerWeek;
    }

    // GST: 9% CGST + 9% SGST
    const cgst = Math.round(baseAmount * 0.09);
    const sgst = Math.round(baseAmount * 0.09);

    let couponDiscount = 0;
    let couponId: string | undefined;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
      if (coupon && (!coupon.expiresAt || coupon.expiresAt > new Date()) && (!coupon.maxUses || coupon.uses < coupon.maxUses)) {
        couponId = coupon.id;
        if (coupon.discountType === "percentage") {
          couponDiscount = Math.round(baseAmount * (coupon.discountValue / 100));
        } else {
          couponDiscount = coupon.discountValue;
        }
      }
    }

    const securityDeposit = vehicle.securityDeposit;
    const grandTotal = baseAmount + cgst + sgst - couponDiscount + securityDeposit;

    return {
      vehicle: { id: vehicle.id, name: vehicle.name, pricePerDay: vehicle.pricePerDay },
      duration,
      hours: hours < 24 ? hours : undefined,
      days: hours >= 24 ? days : undefined,
      baseAmount,
      cgst,
      sgst,
      couponDiscount,
      couponId,
      securityDeposit,
      grandTotal,
    };
  }

  async createBooking(input: CreateBookingInput) {
    const { userId, vehicleId, startTime, endTime, couponCode } = input;

    const vehicle = await vehicleRepository.findVehicleById(vehicleId);
    if (!vehicle) throw new ApiError(404, "Vehicle not found.");
    if (vehicle.status !== "APPROVED") throw new ApiError(400, "Vehicle is not available for booking.");

    // Check for overlapping confirmed/active bookings
    const overlapping = await bookingRepository.findOverlappingBookings(vehicleId, startTime, endTime);
    if (overlapping.length > 0) {
      throw new ApiError(409, "Vehicle is already booked for the selected dates.");
    }

    const pricing = await this.calculatePrice(vehicleId, startTime, endTime, couponCode);

    const booking = await bookingRepository.createBooking({
      userId,
      vehicleId,
      startTime,
      endTime,
      duration: pricing.duration,
      securityDeposit: pricing.securityDeposit,
      totalAmount: pricing.grandTotal,
      couponId: pricing.couponId,
    });

    // Increment coupon usage
    if (pricing.couponId) {
      await prisma.coupon.update({
        where: { id: pricing.couponId },
        data: { uses: { increment: 1 } },
      });
    }

    // Send notification to vehicle owner
    await notificationRepository.createNotification({
      userId: vehicle.ownerId,
      type: "BOOKING_REQUEST",
      message: `New booking request for your vehicle "${vehicle.name}" from ${booking.user.name}.`,
      vehicleId,
    });

    return booking;
  }

  async getUserBookings(userId: string, status?: BookingStatus) {
    return bookingRepository.findBookingsByUser(userId, status);
  }

  async getOwnerBookings(ownerId: string, status?: BookingStatus) {
    return bookingRepository.findBookingsByOwner(ownerId, status);
  }

  async getBookingById(id: string, requesterId: string) {
    const booking = await bookingRepository.findBookingById(id);
    if (!booking) throw new ApiError(404, "Booking not found.");

    const isOwner = booking.vehicle.owner.id === requesterId;
    const isRenter = booking.userId === requesterId;
    if (!isOwner && !isRenter) throw new ApiError(403, "Access denied.");

    return booking;
  }

  async updateBookingStatus(id: string, ownerId: string, status: BookingStatus) {
    const booking = await bookingRepository.findBookingById(id);
    if (!booking) throw new ApiError(404, "Booking not found.");

    const isOwner = booking.vehicle.owner.id === ownerId;
    if (!isOwner) throw new ApiError(403, "Only the vehicle owner can update booking status.");

    const validTransitions: Record<string, BookingStatus[]> = {
      PENDING: [BookingStatus.CONFIRMED, BookingStatus.REJECTED],
      CONFIRMED: [BookingStatus.ACTIVE, BookingStatus.CANCELLED],
      ACTIVE: [BookingStatus.COMPLETED],
    };

    const allowed = validTransitions[booking.status] || [];
    if (!allowed.includes(status)) {
      throw new ApiError(400, `Cannot transition from ${booking.status} to ${status}.`);
    }

    const updated = await bookingRepository.updateBookingStatus(id, status);

    // Notify renter
    const messages: Record<string, string> = {
      CONFIRMED: `Your booking for "${booking.vehicle.name}" has been confirmed by the host!`,
      REJECTED: `Your booking request for "${booking.vehicle.name}" was declined by the host.`,
      ACTIVE: `Your trip with "${booking.vehicle.name}" has started. Enjoy the ride!`,
      COMPLETED: `Your trip with "${booking.vehicle.name}" is now complete. Please leave a review!`,
    };
    const msg = messages[status];
    if (msg) {
      await notificationRepository.createNotification({
        userId: booking.userId,
        type: `BOOKING_${status}`,
        message: msg,
        vehicleId: booking.vehicleId,
      });
    }

    return updated;
  }

  async cancelBooking(id: string, userId: string) {
    const booking = await bookingRepository.findBookingById(id);
    if (!booking) throw new ApiError(404, "Booking not found.");

    const isRenter = booking.userId === userId;
    const isOwner = booking.vehicle.owner.id === userId;
    if (!isRenter && !isOwner) throw new ApiError(403, "Access denied.");

    const cancellable = [BookingStatus.PENDING, BookingStatus.CONFIRMED];
    if (!cancellable.includes(booking.status)) {
      throw new ApiError(400, `Cannot cancel a booking that is ${booking.status}.`);
    }

    const updated = await bookingRepository.updateBookingStatus(id, BookingStatus.CANCELLED);

    // Calculate refund based on cancellation policy
    const hoursUntilTrip = (booking.startTime.getTime() - Date.now()) / (1000 * 60 * 60);
    let refundPercent = 0;
    if (hoursUntilTrip >= 48) refundPercent = 100;
    else if (hoursUntilTrip >= 24) refundPercent = 75;
    else if (hoursUntilTrip >= 12) refundPercent = 50;

    // Create transaction record for refund
    if (booking.payment?.status === PaymentStatus.SUCCESS && refundPercent > 0) {
      const refundAmount = Math.round((booking.totalAmount * refundPercent) / 100);
      await prisma.transaction.create({
        data: {
          bookingId: id,
          amount: refundAmount,
          type: "refund",
          status: "success",
        },
      });
    }

    // Notify owner
    await notificationRepository.createNotification({
      userId: booking.vehicle.owner.id,
      type: "BOOKING_CANCELLED",
      message: `Booking for "${booking.vehicle.name}" was cancelled.`,
      vehicleId: booking.vehicleId,
    });

    return { booking: updated, refundPercent };
  }

  async getOwnerAnalytics(ownerId: string) {
    const [summary, monthly] = await Promise.all([
      bookingRepository.getOwnerEarningsSummary(ownerId),
      bookingRepository.getMonthlyEarnings(ownerId, 6),
    ]);

    const totalBookings = await bookingRepository.countBookingsByOwner(ownerId);
    const ownerVehicles = await vehicleRepository.findVehicles({ where: { ownerId } });

    return {
      totalEarnings: summary._sum.totalAmount || 0,
      completedTrips: summary._count.id || 0,
      totalBookings,
      totalVehicles: ownerVehicles.length,
      monthlyEarnings: monthly,
    };
  }
}

export const bookingService = new BookingService();
export default bookingService;
