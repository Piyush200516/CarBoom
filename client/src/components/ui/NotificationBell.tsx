/**
 * NotificationBell — real-time notification indicator
 *
 * Uses SocketContext for live updates and falls back to polling the REST API
 * on first mount to hydrate the unread count from DB.
 *
 * Usage: drop <NotificationBell /> anywhere in the Navbar.
 */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSocket, RealtimeNotification } from "../../store/SocketContext";
import { toast } from "./Toast";
import api from "../../utils/api";
import "./NotificationBell.css";

interface DBNotification {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  vehicleId?: string;
}

const NotificationBell: React.FC = () => {
  const { liveNotifications, unreadCount, setUnreadCount, markAllRead } = useSocket();
  const [open, setOpen] = useState(false);
  const [dbNotifications, setDbNotifications] = useState<DBNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // ── Fetch DB notifications on open ───────────────────────────────────────
  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<{
        data: { notifications: DBNotification[]; unreadCount: number };
      }>("/notifications?includeRead=true");
      const { notifications, unreadCount: dbUnread } = res.data.data;
      setDbNotifications(notifications);
      // Sync unread count from DB on first load
      setUnreadCount((prev) => Math.max(prev, dbUnread));
    } catch {
      // silently ignore — socket stream still works
    } finally {
      setLoading(false);
    }
  }, [setUnreadCount]);

  // Fetch when panel opens
  useEffect(() => {
    if (open) fetchNotifications();
  }, [open, fetchNotifications]);

  // ── Show toast on every NEW live notification ─────────────────────────────
  const prevLiveCount = useRef(0);
  useEffect(() => {
    if (liveNotifications.length > prevLiveCount.current) {
      const newest = liveNotifications[0];
      if (newest) {
        const icon = getIcon(newest.type);
        toast.info(`${icon} ${newest.message}`);
      }
    }
    prevLiveCount.current = liveNotifications.length;
  }, [liveNotifications]);

  // ── Close on outside click ───────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // ── Mark all as read via API + local ────────────────────────────────────
  const handleMarkAllRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      markAllRead();
      setDbNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {
      // ignore
    }
  };

  // ── Merge live + DB, deduplicate by id ──────────────────────────────────
  const mergedNotifications: (RealtimeNotification | DBNotification)[] = [
    ...liveNotifications.filter(
      (ln) => !dbNotifications.some((dn) => dn.id === ln.id)
    ),
    ...dbNotifications,
  ];

  return (
    <div className="notif-bell-wrapper" ref={panelRef}>
      {/* Bell button */}
      <button
        id="notif-bell-btn"
        className={`notif-bell-btn ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="notif-badge" aria-label={`${unreadCount} unread`}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="notif-panel" role="dialog" aria-label="Notifications panel">
          <div className="notif-panel-header">
            <span className="notif-panel-title">Notifications</span>
            {unreadCount > 0 && (
              <button className="notif-mark-read-btn" onClick={handleMarkAllRead}>
                Mark all read
              </button>
            )}
          </div>

          <div className="notif-list">
            {loading && (
              <div className="notif-loading">
                <div className="notif-spinner" />
              </div>
            )}

            {!loading && mergedNotifications.length === 0 && (
              <div className="notif-empty">
                <span>🔔</span>
                <p>No notifications yet</p>
              </div>
            )}

            {!loading &&
              mergedNotifications.map((notif, idx) => (
                <div
                  key={notif.id ?? idx}
                  className={`notif-item ${!notif.isRead ? "unread" : ""}`}
                >
                  <span className="notif-icon">{getIcon(notif.type)}</span>
                  <div className="notif-content">
                    <p className="notif-message">{notif.message}</p>
                    <span className="notif-time">
                      {formatTime(notif.createdAt)}
                    </span>
                  </div>
                  {!notif.isRead && <span className="notif-dot" />}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getIcon(type: string): string {
  if (type.includes("BOOKING_REQUEST")) return "📋";
  if (type.includes("CONFIRMED")) return "✅";
  if (type.includes("REJECTED")) return "❌";
  if (type.includes("CANCELLED")) return "🚫";
  if (type.includes("ACTIVE")) return "🚗";
  if (type.includes("COMPLETED")) return "🏁";
  if (type.includes("PAYMENT")) return "💳";
  return "🔔";
}

function formatTime(date: Date | string): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export default NotificationBell;
