// src/services/reviewService.ts
import api from "../utils/api";

export interface Review {
  id: string;
  userId: string;
  vehicleId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  deletedAt?: string | null;
  user?: { id: string; name: string; avatar?: string };
  vehicle?: { id: string; name: string };
}

export interface VehicleReviewsResult {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
  averageRating: number;
  totalReviews: number;
}

const reviewService = {
  /** Submit a review for a completed booking */
  async submitReview(payload: {
    vehicleId: string;
    rating: number;
    comment?: string;
  }): Promise<Review> {
    const res = await api.post("/reviews", payload);
    return res.data.data.review;
  },

  /** Get all reviews for a vehicle (paginated) */
  async getVehicleReviews(
    vehicleId: string,
    page = 1,
    limit = 10
  ): Promise<VehicleReviewsResult> {
    const res = await api.get(`/reviews/vehicle/${vehicleId}`, {
      params: { page, limit },
    });
    return res.data.data;
  },

  /** Get logged-in user's own reviews */
  async getMyReviews(): Promise<Review[]> {
    const res = await api.get("/reviews/user/me");
    return res.data.data.reviews;
  },

  /** Delete a review */
  async deleteReview(reviewId: string): Promise<void> {
    await api.delete(`/reviews/${reviewId}`);
  },
};

export default reviewService;
