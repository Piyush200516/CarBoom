import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RealtimeNotification {
  id?: string;
  type: string;
  message: string;
  vehicleId?: string;
  createdAt: Date | string;
  isRead: boolean;
}

export interface BookingUpdatePayload {
  action: string;
  bookingId: string;
  status?: string;
  vehicleName?: string;
  renterName?: string;
  refundPercent?: number;
}

export interface PaymentConfirmedPayload {
  bookingId: string;
  amount: number;
  razorpayPaymentId: string;
  vehicleName: string;
}

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  /** Live notifications received in this session (newest first) */
  liveNotifications: RealtimeNotification[];
  /** Unread count (includes DB unread + new live ones) */
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
  markAllRead: () => void;
  /** Subscribe to booking updates */
  onBookingUpdate: (handler: (payload: BookingUpdatePayload) => void) => () => void;
  /** Subscribe to payment confirmations */
  onPaymentConfirmed: (handler: (payload: PaymentConfirmedPayload) => void) => () => void;
}

// ─── Socket URL resolution ────────────────────────────────────────────────────
// In dev: Vite proxy handles /api but Socket.IO needs a direct ws URL.
// We connect to the Express server directly.
const SOCKET_URL =
  import.meta.env.VITE_API_URL
    ? new URL(import.meta.env.VITE_API_URL as string).origin
    : "http://localhost:5000";

// ─── Context ─────────────────────────────────────────────────────────────────

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [liveNotifications, setLiveNotifications] = useState<RealtimeNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // ── Connect when user logs in ─────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Create socket (lazy, not auto-connecting yet)
    const socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    // ── Lifecycle events ────────────────────────────────────────────────────
    socket.on("connect", () => {
      setIsConnected(true);
      // Tell server which user room to join
      socket.emit("join", user.id);
      if (import.meta.env.DEV) {
        console.log("[Socket] Connected:", socket.id);
      }
    });

    socket.on("joined", ({ userId }: { userId: string; socketId: string }) => {
      if (import.meta.env.DEV) {
        console.log("[Socket] Joined room for user:", userId);
      }
    });

    socket.on("disconnect", (reason) => {
      setIsConnected(false);
      if (import.meta.env.DEV) {
        console.log("[Socket] Disconnected:", reason);
      }
    });

    socket.on("connect_error", (err) => {
      if (import.meta.env.DEV) {
        console.warn("[Socket] Connection error:", err.message);
      }
    });

    // ── Domain events ───────────────────────────────────────────────────────

    socket.on("notification:new", (notif: RealtimeNotification) => {
      setLiveNotifications((prev) => [notif, ...prev]);
      setUnreadCount((c) => c + 1);
    });

    // Cleanup on logout or user change
    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setLiveNotifications([]);
    };
  }, [isAuthenticated, user]);

  // ── markAllRead — clears local badge ────────────────────────────────────
  const markAllRead = useCallback(() => {
    setUnreadCount(0);
    setLiveNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  // ── Booking update subscription ──────────────────────────────────────────
  const onBookingUpdate = useCallback(
    (handler: (payload: BookingUpdatePayload) => void) => {
      const sock = socketRef.current;
      if (!sock) return () => {};
      sock.on("booking:updated", handler);
      return () => sock.off("booking:updated", handler);
    },
    []
  );

  // ── Payment confirmed subscription ──────────────────────────────────────
  const onPaymentConfirmed = useCallback(
    (handler: (payload: PaymentConfirmedPayload) => void) => {
      const sock = socketRef.current;
      if (!sock) return () => {};
      sock.on("payment:confirmed", handler);
      return () => sock.off("payment:confirmed", handler);
    },
    []
  );

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        liveNotifications,
        unreadCount,
        setUnreadCount,
        markAllRead,
        onBookingUpdate,
        onPaymentConfirmed,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = (): SocketContextType => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used within SocketProvider");
  return ctx;
};
