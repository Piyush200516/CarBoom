import { prisma } from "../config/db.js";

export class ReviewRepository {
  async createReview(data: {
    userId: string;
    vehicleId: string;
    rating: number;
    comment?: string;
  }) {
    return prisma.review.create({
      data,
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        vehicle: { select: { id: true, name: true } },
      },
    });
  }

  async findReviewsByVehicle(vehicleId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { vehicleId, deletedAt: null },
        include: { user: { select: { id: true, name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.review.count({ where: { vehicleId, deletedAt: null } }),
    ]);
    return { reviews, total, page, limit };
  }

  async findReviewsByUser(userId: string) {
    return prisma.review.findMany({
      where: { userId, deletedAt: null },
      include: { vehicle: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async getVehicleRatingStats(vehicleId: string) {
    return prisma.review.aggregate({
      where: { vehicleId, deletedAt: null },
      _avg: { rating: true },
      _count: { id: true },
    });
  }

  async findExistingReview(userId: string, vehicleId: string) {
    return prisma.review.findFirst({
      where: { userId, vehicleId, deletedAt: null },
    });
  }

  async softDeleteReview(id: string) {
    return prisma.review.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const reviewRepository = new ReviewRepository();
export default reviewRepository;
