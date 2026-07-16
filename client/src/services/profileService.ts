// src/services/profileService.ts
import api from "../utils/api";

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  gender?: string;
  dob?: string; // ISO format
  city?: string;
  state?: string;
  address?: string;
  role: string; // "RENTER" | "OWNER"
  createdAt: string;
  isVerified?: boolean;
}

const profileService = {
  async getProfile(): Promise<ProfileData> {
    const response = await api.get("/auth/me");
    return response.data;
  },
  async updateProfile(payload: Partial<ProfileData>): Promise<ProfileData> {
    const response = await api.put("/auth/me", payload);
    return response.data;
  },
  async uploadPhoto(formData: FormData): Promise<{ avatarUrl: string }> {
    const response = await api.post("/auth/me/photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};

export default profileService;
