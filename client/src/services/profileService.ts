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
    const response = await api.get("/users/profile");
    // Expected ApiResponse: { status, data: { user }, message }
    return response.data.data.user as ProfileData;
  },

  async updateProfile(payload: Partial<ProfileData>): Promise<ProfileData> {
    const response = await api.put("/users/profile", payload);
    return response.data.data.user as ProfileData;
  },

  async uploadPhoto(formData: FormData): Promise<{ avatarUrl: string }> {
    const response = await api.post("/users/profile/photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // Return the avatar URL object
    return response.data.data;
  },
};

export default profileService;
