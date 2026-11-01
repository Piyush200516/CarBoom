// src/services/bookingService.ts
import api from "../utils/api";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED";

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  totalAmount: number;
  securityDeposit: number;
  duration: string;
  createdAt: string;
  vehicle?: {
    id: string;
    name: string;
    images?: { url: string }[];
    owner?: { id: string; name: string };
  };
  user?: { id: string; name: string; avatar?: string };
  payment?: { status: string; amount: number };
}

export interface PricingResult {
  vehicle: { id: string; name: string; pricePerDay: number };
  duration: string;
  hours?: number;
  days?: number;
  baseAmount: number;
  cgst: number;
  sgst: number;
  couponDiscount: number;
  couponId?: string;
  securityDeposit: number;
  grandTotal: number;
}

const bookingService = {
  async calculatePrice(payload: {
    vehicleId: string;
    startTime: string;
    endTime: string;
    couponCode?: string;
  }): Promise<PricingResult> {
    const res = await api.post("/bookings/calculate", payload);
    return res.data.data;
  },

  async createBooking(payload: {
    vehicleId: string;
    startTime: string;
    endTime: string;
    couponCode?: string;
  }): Promise<Booking> {
    const res = await api.post("/bookings", payload);
    return res.data.data.booking;
  },

  async getMyBookings(status?: BookingStatus): Promise<Booking[]> {
    const params = status ? { status } : {};
    const res = await api.get("/bookings/my", { params });
    return res.data.data.bookings;
  },

  async getOwnerBookings(status?: BookingStatus): Promise<Booking[]> {
    const params = status ? { status } : {};
    const res = await api.get("/bookings/owner", { params });
    return res.data.data.bookings;
  },

  async getBookingById(id: string): Promise<Booking> {
    const res = await api.get(`/bookings/${id}`);
    return res.data.data.booking;
  },

  async updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
    const res = await api.patch(`/bookings/${id}/status`, { status });
    return res.data.data.booking;
  },

  async cancelBooking(id: string): Promise<{ booking: Booking; refundPercent: number }> {
    const res = await api.post(`/bookings/${id}/cancel`);
    return res.data.data;
  },

  async getOwnerAnalytics(): Promise<{
    totalEarnings: number;
    completedTrips: number;
    totalBookings: number;
    totalVehicles: number;
    monthlyEarnings: Array<{ month: string; earnings: number }>;
  }> {
    const res = await api.get("/bookings/owner/analytics");
    return res.data.data;
  },
};

export default bookingService;
