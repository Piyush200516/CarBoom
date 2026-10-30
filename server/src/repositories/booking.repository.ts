import { prisma } from "../config/db.js";
import { BookingStatus, BookingDuration, Prisma } from "@prisma/client";

export class BookingRepository {
  async createBooking(data: {
    userId: string;
    vehicleId: string;
    startTime: Date;
    endTime: Date;
    duration: BookingDuration;
    securityDeposit: number;
    totalAmount: number;
    couponId?: string;
  }) {
    return prisma.booking.create({
      data,
      include: {
        vehicle: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
            owner: { select: { id: true, name: true, phone: true, email: true } },
          },
        },
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });
  }

  async findBookingById(id: string) {
    return prisma.booking.findUnique({
      where: { id },
      include: {
        vehicle: {
          include: {
            images: { orderBy: { displayOrder: "asc" } },
            owner: { select: { id: true, name: true, email: true, phone: true, avatar: true } },
          },
        },
        user: { select: { id: true, name: true, email: true, phone: true, avatar: true } },
        payment: true,
        transaction: true,
        coupon: true,
      },
    });
  }

  async findBookingsByUser(userId: string, status?: BookingStatus) {
    const where: Prisma.BookingWhereInput = { userId };
    if (status) where.status = status;

    return prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        vehicle: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
            owner: { select: { id: true, name: true } },
          },
        },
        payment: { select: { status: true, method: true } },
      },
    });
  }

  async findBookingsByOwner(ownerId: string, status?: BookingStatus) {
    const where: Prisma.BookingWhereInput = {
      vehicle: { ownerId },
    };
    if (status) where.status = status;

    return prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        vehicle: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
          },
        },
        user: { select: { id: true, name: true, email: true, phone: true, avatar: true } },
        payment: { select: { status: true, method: true } },
      },
    });
  }

  async updateBookingStatus(id: string, status: BookingStatus) {
    return prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        vehicle: { select: { id: true, name: true, ownerId: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findOverlappingBookings(vehicleId: string, startTime: Date, endTime: Date, excludeId?: string) {
    return prisma.booking.findMany({
      where: {
        vehicleId,
        id: excludeId ? { not: excludeId } : undefined,
        status: { notIn: [BookingStatus.CANCELLED, BookingStatus.REJECTED] },
        OR: [
          { startTime: { lt: endTime }, endTime: { gt: startTime } },
        ],
      },
    });
  }

  async countBookingsByOwner(ownerId: string) {
    return prisma.booking.count({
      where: { vehicle: { ownerId } },
    });
  }

  async getOwnerEarningsSummary(ownerId: string) {
    return prisma.booking.aggregate({
      where: {
        vehicle: { ownerId },
        status: BookingStatus.COMPLETED,
      },
      _sum: { totalAmount: true },
      _count: { id: true },
    });
  }

  async getMonthlyEarnings(ownerId: string, months = 6) {
    const since = new Date();
    since.setMonth(since.getMonth() - months);

    return prisma.booking.groupBy({
      by: ["createdAt"],
      where: {
        vehicle: { ownerId },
        status: BookingStatus.COMPLETED,
        createdAt: { gte: since },
      },
      _sum: { totalAmount: true },
      _count: { id: true },
    });
  }
}

export const bookingRepository = new BookingRepository();
export default bookingRepository;
