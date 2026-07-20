import axios from "axios";
import { emitAuthLogout } from "../store/AuthContext";

// ─── Base URL resolution ───────────────────────────────────────────────────────
// Development : VITE_API_URL is NOT set, so Vite proxies /api/v1/* to Express.
// Production  : VITE_API_URL may be either the bare Render origin or the full
//               API URL. Normalize both to the canonical /api/v1 prefix.
// ─────────────────────────────────────────────────────────────────────────────
const API_VERSION_PREFIX = "/api/v1";

const ensureApiVersionPath = (pathname: string) => {
  const normalizedPath = pathname.replace(/\/+$/, "");

  if (!normalizedPath || normalizedPath === "/") {
    return API_VERSION_PREFIX;
  }

  if (normalizedPath === "/api") {
    return API_VERSION_PREFIX;
  }

  if (normalizedPath.endsWith(API_VERSION_PREFIX)) {
    return normalizedPath;
  }

  return `${normalizedPath}${API_VERSION_PREFIX}`;
};

const normalizeApiBaseUrl = (rawBaseUrl?: string) => {
  const fallbackBaseUrl = API_VERSION_PREFIX;
  const trimmedBaseUrl = rawBaseUrl?.trim();

  if (!trimmedBaseUrl) {
    return fallbackBaseUrl;
  }

  if (!trimmedBaseUrl.startsWith("http")) {
    const relativeBaseUrl = trimmedBaseUrl.startsWith("/")
      ? trimmedBaseUrl
      : `/${trimmedBaseUrl}`;
    return ensureApiVersionPath(relativeBaseUrl);
  }

  try {
    const url = new URL(trimmedBaseUrl);
    url.pathname = ensureApiVersionPath(url.pathname);
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch (error) {
    console.error("[API] Failed to parse VITE_API_URL as a valid URL:", error);
    return fallbackBaseUrl;
  }
};

const BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);

// Safety net: catch misconfigured production builds early.
if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
  console.error(
    "[API] VITE_API_URL is not set for a production build. " +
      "All API calls will fail. Set this variable on Vercel or in client/.env.production."
  );
}

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Required to send/receive httpOnly cookies cross-origin
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
