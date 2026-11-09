// src/services/vehicleService.ts
import api from "../utils/api";

export interface VehicleImage {
  id: string;
  url: string;
  isPrimary?: boolean;
  displayOrder?: number;
}

export interface VehicleAvailability {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface VehicleOwner {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface VehicleItem {
  id: string;
  name: string;
  type: string;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  registrationNumber?: string;
  fuelType: string;
  transmission: string;
  color?: string;
  seatingCapacity: number;
  mileage: number;
  description: string;
  city: string;
  state?: string;
  pickupAddress: string;
  latitude?: number;
  longitude?: number;
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
  securityDeposit: number;
  status: string;
  ownerId?: string;
  owner?: VehicleOwner;
  images: VehicleImage[];
  availabilities?: VehicleAvailability[];
  avgRating?: number;
  reviewsCount?: number;
  createdAt?: string;
}

export interface VehicleBrowseParams {
  type?: string;
  city?: string;
  brand?: string;
  search?: string;
  pickupDate?: string;
  returnDate?: string;
  fuelType?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface VehicleBrowseResponse {
  vehicles: VehicleItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const vehicleService = {
  async getVehicles(params?: VehicleBrowseParams): Promise<VehicleBrowseResponse> {
    const response = await api.get("/vehicles", { params });
    return response.data.data;
  },

  async getVehicleById(id: string): Promise<VehicleItem> {
    const response = await api.get(`/vehicles/${id}`);
    return response.data.data.vehicle;
  },

  async createVehicle(payload: FormData | Record<string, any>) {
    const response = await api.post("/vehicles", payload);
    return response.data.data;
  },

  async getOwnerVehicles(): Promise<VehicleItem[]> {
    const response = await api.get("/vehicles/owner/me");
    return response.data.data.vehicles;
  },
};

export default vehicleService;
