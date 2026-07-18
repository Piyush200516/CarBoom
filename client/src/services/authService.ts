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

export const authService = {
  async register(data: any) {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  async login(data: any) {
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
