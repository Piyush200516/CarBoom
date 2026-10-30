import { prisma } from "../config/db.js";

export class NotificationRepository {
  async createNotification(data: {
    userId: string;
    type: string;
    message: string;
    vehicleId?: string;
  }) {
    return prisma.notification.create({ data });
  }

  async createManyNotifications(notifications: Array<{
    userId: string;
    type: string;
    message: string;
    vehicleId?: string;
  }>) {
    return prisma.notification.createMany({ data: notifications });
  }

  async findByUser(userId: string, includeRead = false) {
    return prisma.notification.findMany({
      where: {
        userId,
        ...(includeRead ? {} : { isRead: false }),
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  }

  async markAsRead(id: string, userId: string) {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  async countUnread(userId: string) {
    return prisma.notification.count({ where: { userId, isRead: false } });
  }
}

export const notificationRepository = new NotificationRepository();
export default notificationRepository;
