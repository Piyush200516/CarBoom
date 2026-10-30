import { Request, Response } from "express";
import { reviewService } from "../services/review.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export class ReviewController {
  /**
   * POST /api/v1/reviews — Submit a review (after completed booking)
   */
  submitReview = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const { vehicleId, rating, comment } = req.body;
    const review = await reviewService.submitReview({
      userId: req.user.userId,
      vehicleId,
      rating: Number(rating),
      comment,
    });
    res.status(201).json(new ApiResponse(201, { review }, "Review submitted successfully."));
  });

  /**
   * GET /api/v1/reviews/vehicle/:vehicleId — Get vehicle reviews
   */
  getVehicleReviews = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await reviewService.getVehicleReviews(req.params.vehicleId, page, limit);
    res.status(200).json(new ApiResponse(200, result, "Reviews fetched."));
  });

  /**
   * GET /api/v1/reviews/user/me — Get logged-in user's reviews
   */
  getMyReviews = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const reviews = await reviewService.getUserReviews(req.user.userId);
    res.status(200).json(new ApiResponse(200, { reviews }, "Your reviews fetched."));
  });

  /**
   * DELETE /api/v1/reviews/:id — Delete own review
   */
  deleteReview = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    await reviewService.deleteReview(req.params.id, req.user.userId);
    res.status(200).json(new ApiResponse(200, null, "Review deleted."));
  });
}

export const reviewController = new ReviewController();
export default reviewController;
