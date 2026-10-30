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
};
