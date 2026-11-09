import api from "../utils/api";

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  async register(data: RegisterPayload) {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  async login(data: LoginPayload) {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  async logout() {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  async getMe() {
    const response = await api.get("/auth/me");
    return response.data;
  },

  async sendPhoneOtp(phone: string) {
    const response = await api.post("/auth/phone-otp/send", { phone });
    return response.data;
  },

  async verifyPhoneOtp(phone: string, otp: string, name?: string) {
    const response = await api.post("/auth/phone-otp/verify", { phone, otp, name });
    return response.data;
  },

  async loginWithOAuth(provider: "google" | "github", email: string, name: string, avatar?: string) {
    const response = await api.post("/auth/oauth", { provider, email, name, avatar });
    return response.data;
  },
};
