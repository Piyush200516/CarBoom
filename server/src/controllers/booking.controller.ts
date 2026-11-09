import { Request, Response } from "express";
import { bookingService } from "../services/booking.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BookingStatus } from "@prisma/client";

export class BookingController {
  /**
   * POST /api/v1/bookings/calculate — Calculate booking price
   */
  calculatePrice = asyncHandler(async (req: Request, res: Response) => {
    const { vehicleId, startTime, endTime, couponCode } = req.body;
    const pricing = await bookingService.calculatePrice(
      vehicleId,
      new Date(startTime),
      new Date(endTime),
      couponCode
    );
    res.status(200).json(new ApiResponse(200, pricing, "Pricing calculated."));
  });

  /**
   * POST /api/v1/bookings — Create a new booking (Renter)
   */
  createBooking = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const { vehicleId, startTime, endTime, couponCode } = req.body;

    const booking = await bookingService.createBooking({
      userId: req.user.userId,
      vehicleId,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      couponCode,
    });

    res.status(201).json(new ApiResponse(201, { booking }, "Booking created successfully."));
  });

  /**
   * GET /api/v1/bookings/my — Renter's own bookings
   */
  getMyBookings = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const status = req.query.status as BookingStatus | undefined;
    const bookings = await bookingService.getUserBookings(req.user.userId, status);
    res.status(200).json(new ApiResponse(200, { bookings }, "Bookings fetched."));
  });

  /**
   * GET /api/v1/bookings/owner — Owner's received bookings
   */
  getOwnerBookings = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const status = req.query.status as BookingStatus | undefined;
    const bookings = await bookingService.getOwnerBookings(req.user.userId, status);
    res.status(200).json(new ApiResponse(200, { bookings }, "Owner bookings fetched."));
  });

  /**
   * GET /api/v1/bookings/:id — Get booking by ID
   */
  getBookingById = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const bookingId = req.params.id as string;
    const booking = await bookingService.getBookingById(bookingId, req.user.userId);
    res.status(200).json(new ApiResponse(200, { booking }, "Booking fetched."));
  });

  /**
   * PATCH /api/v1/bookings/:id/status — Update status (Owner: confirm/reject)
   */
  updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const { status } = req.body;
    if (!status) throw new ApiError(400, "Status is required.");
    const bookingId = req.params.id as string;

    const booking = await bookingService.updateBookingStatus(
      bookingId,
      req.user.userId,
      status as BookingStatus
    );
    res.status(200).json(new ApiResponse(200, { booking }, `Booking ${status.toLowerCase()}.`));
  });

  /**
   * POST /api/v1/bookings/:id/cancel — Cancel booking
   */
  cancelBooking = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const bookingId = req.params.id as string;
    const result = await bookingService.cancelBooking(bookingId, req.user.userId);
    res
      .status(200)
      .json(new ApiResponse(200, result, `Booking cancelled. Refund: ${result.refundPercent}%`));
  });

  /**
   * GET /api/v1/bookings/owner/analytics — Owner analytics
   */
  getOwnerAnalytics = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const analytics = await bookingService.getOwnerAnalytics(req.user.userId);
    res.status(200).json(new ApiResponse(200, analytics, "Analytics fetched."));
  });
}

export const bookingController = new BookingController();
export default bookingController;
