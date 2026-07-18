import axios from "axios";
import { emitAuthLogout } from "../store/AuthContext";

// In development: use a relative path so the Vite proxy forwards /api/v1/* to
// http://localhost:5000 — this avoids CORS and ensures the correct route prefix.
// In production: VITE_API_URL must be set to your deployed backend URL in Vercel
// (e.g. https://carboom-api.onrender.com/api/v1).
const BASE_URL =
  import.meta.env.VITE_API_URL ?? "/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required to send and receive httpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(
        `[API] ${config.method?.toUpperCase()} ${config.url}`
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────────────────
// Strategy:
//   1. On a 401 from any endpoint *except* /auth/me, /auth/refresh, /auth/login,
//      attempt a silent token refresh and retry the original request once.
//   2. If the refresh itself fails (401/403), emit a global logout event so
//      AuthContext can clear state — no circular imports needed.
//   3. /auth/me 401s are NOT retried here; AuthContext handles them naturally.

const AUTH_ENDPOINTS = ["/auth/refresh", "/auth/login", "/auth/register", "/auth/me"];

api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(
        `[API] ${response.config.method?.toUpperCase()} ${response.config.url} → ${response.status}`
      );
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const isAuthEndpoint = AUTH_ENDPOINTS.some((ep) =>
      originalRequest?.url?.includes(ep)
    );

    // Attempt a single token refresh for non-auth 401s
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;
      try {
        if (import.meta.env.DEV) {
          console.log("[API] Access token expired — attempting refresh...");
        }
        await api.post("/auth/refresh");
        // Refresh succeeded → retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        if (import.meta.env.DEV) {
          console.warn(
            "[API] Token refresh failed — forcing logout."
          );
        }
        // Notify AuthContext to clear user state without a circular import
        emitAuthLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
