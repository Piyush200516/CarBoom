import { Request, Response } from "express";
import { notificationRepository } from "../repositories/notification.repository.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export class NotificationController {
  /**
   * GET /api/v1/notifications — Get user's notifications
   */
  getNotifications = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const includeRead = req.query.includeRead === "true";
    const notifications = await notificationRepository.findByUser(req.user.userId, includeRead);
    const unreadCount = await notificationRepository.countUnread(req.user.userId);
    res.status(200).json(new ApiResponse(200, { notifications, unreadCount }, "Notifications fetched."));
  });

  /**
   * PATCH /api/v1/notifications/:id/read — Mark one as read
   */
  markAsRead = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    await notificationRepository.markAsRead(req.params.id, req.user.userId);
    res.status(200).json(new ApiResponse(200, null, "Notification marked as read."));
  });

  /**
   * PATCH /api/v1/notifications/read-all — Mark all as read
   */
  markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    await notificationRepository.markAllAsRead(req.user.userId);
    res.status(200).json(new ApiResponse(200, null, "All notifications marked as read."));
  });
}

export const notificationController = new NotificationController();
export default notificationController;
