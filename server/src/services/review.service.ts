import { reviewRepository } from "../repositories/review.repository.js";
import { ApiError } from "../utils/apiError.js";
import { prisma } from "../config/db.js";

export class ReviewService {
  async submitReview(data: {
    userId: string;
    vehicleId: string;
    rating: number;
    comment?: string;
  }) {
    const { userId, vehicleId, rating } = data;

    // Validate rating range
    if (rating < 1 || rating > 5) throw new ApiError(400, "Rating must be between 1 and 5.");

    // Check if vehicle exists
    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) throw new ApiError(404, "Vehicle not found.");

    // Verify user completed a booking for this vehicle
    const completedBooking = await prisma.booking.findFirst({
      where: {
        userId,
        vehicleId,
        status: "COMPLETED",
      },
    });
    if (!completedBooking) {
      throw new ApiError(403, "You can only review a vehicle you have rented and completed.");
    }

    // Prevent duplicate reviews
    const existing = await reviewRepository.findExistingReview(userId, vehicleId);
    if (existing) throw new ApiError(409, "You have already reviewed this vehicle.");

    return reviewRepository.createReview(data);
  }

  async getVehicleReviews(vehicleId: string, page: number, limit: number) {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) throw new ApiError(404, "Vehicle not found.");

    const result = await reviewRepository.findReviewsByVehicle(vehicleId, page, limit);
    const stats = await reviewRepository.getVehicleRatingStats(vehicleId);

    return {
      ...result,
      averageRating: stats._avg.rating || 0,
      totalReviews: stats._count.id,
    };
  }

  async getUserReviews(userId: string) {
    return reviewRepository.findReviewsByUser(userId);
  }

  async deleteReview(reviewId: string, userId: string) {
    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new ApiError(404, "Review not found.");
    if (review.userId !== userId) throw new ApiError(403, "You can only delete your own reviews.");
    return reviewRepository.softDeleteReview(reviewId);
  }
}

export const reviewService = new ReviewService();
export default reviewService;
