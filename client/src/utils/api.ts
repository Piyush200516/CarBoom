import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true, // Required to send and receive cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to log requests in development
api.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log(`[Frontend Request] ${config.method?.toUpperCase()} ${config.url}`);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle 401s and token refresh
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[Frontend Response] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and it's not a retry or the refresh endpoint itself
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== "/auth/refresh") {
      originalRequest._retry = true;
      try {
        console.log("[Auth] Attempting to refresh token...");
        await api.post("/auth/refresh");
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("[Auth] Token refresh failed. User needs to login.");
        // Redirect to login or let the AuthContext handle the failure
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
