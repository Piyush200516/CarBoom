import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { config } from "../config/config.js";
import { logger } from "../config/logger.js";

// ─── Socket.IO Server instance (singleton) ───────────────────────────────────
let io: SocketIOServer | null = null;

// Map userId → Set<socketId> so one user can have multiple browser tabs
const userSocketMap = new Map<string, Set<string>>();

// ─── Initialize Socket.IO ─────────────────────────────────────────────────────
export const initSocketIO = (httpServer: HttpServer): SocketIOServer => {
  const allowedOrigins =
    config.CORS_ORIGIN === "*"
      ? true
      : config.CORS_ORIGIN.split(",").map((o) => o.trim());

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST"],
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on("connection", (socket: Socket) => {
    logger.info(`[Socket] New connection: ${socket.id}`);

    // ── Client joins their personal room after login ─────────────────────────
    // Client must emit: socket.emit("join", userId)
    socket.on("join", (userId: string) => {
      if (!userId || typeof userId !== "string") return;

      // Add to map
      if (!userSocketMap.has(userId)) {
        userSocketMap.set(userId, new Set());
      }
      userSocketMap.get(userId)!.add(socket.id);

      // Join named room so we can do io.to(userId).emit(...)
      socket.join(userId);

      logger.info(`[Socket] User ${userId} joined room (socket: ${socket.id})`);

      // Ack back so client knows they're live
      socket.emit("joined", { userId, socketId: socket.id });
    });

    // ── Cleanup on disconnect ────────────────────────────────────────────────
    socket.on("disconnect", (reason) => {
      logger.info(`[Socket] Disconnected ${socket.id} — ${reason}`);

      // Remove from map
      for (const [userId, sockets] of userSocketMap.entries()) {
        if (sockets.has(socket.id)) {
          sockets.delete(socket.id);
          if (sockets.size === 0) {
            userSocketMap.delete(userId);
          }
          break;
        }
      }
    });

    // ── Error handler ────────────────────────────────────────────────────────
    socket.on("error", (err) => {
      logger.error(`[Socket] Error on ${socket.id}: ${err.message}`);
    });
  });

  logger.info("✅ Socket.IO initialized");
  return io;
};

// ─── Get the IO instance from anywhere ───────────────────────────────────────
export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized. Call initSocketIO() first.");
  }
  return io;
};

// ─── Emit a notification event to a specific user ────────────────────────────
export const emitToUser = (
  userId: string,
  event: string,
  data: Record<string, unknown>
): void => {
  try {
    getIO().to(userId).emit(event, data);
    logger.info(`[Socket] Emitted '${event}' to user ${userId}`);
  } catch (err) {
    logger.warn(`[Socket] emitToUser failed — IO not ready yet: ${(err as Error).message}`);
  }
};

// ─── Broadcast to all connected clients (e.g., new vehicle listed) ───────────
export const broadcast = (event: string, data: Record<string, unknown>): void => {
  try {
    getIO().emit(event, data);
  } catch (err) {
    logger.warn(`[Socket] broadcast failed — IO not ready: ${(err as Error).message}`);
  }
};

// ─── Convenience helpers for domain events ───────────────────────────────────

/** Emit a notification object to a user's room */
export const emitNotification = (
  userId: string,
  notification: {
    id?: string;
    type: string;
    message: string;
    vehicleId?: string;
    createdAt?: Date;
    isRead?: boolean;
  }
): void => {
  emitToUser(userId, "notification:new", {
    ...notification,
    createdAt: notification.createdAt ?? new Date(),
    isRead: notification.isRead ?? false,
  });
};

/** Emit booking status change to both renter and owner */
export const emitBookingUpdate = (
  userIds: string[],
  bookingData: Record<string, unknown>
): void => {
  for (const uid of userIds) {
    emitToUser(uid, "booking:updated", bookingData);
  }
};

/** Emit payment success to renter */
export const emitPaymentConfirmed = (
  userId: string,
  paymentData: Record<string, unknown>
): void => {
  emitToUser(userId, "payment:confirmed", paymentData);
};
