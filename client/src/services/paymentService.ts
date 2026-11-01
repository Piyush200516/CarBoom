// src/services/paymentService.ts
import api from "../utils/api";

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  payment: {
    id: string;
    status: string;
    razorpayId: string;
  };
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: string;
  status: string;
  razorpayId?: string;
  createdAt: string;
}

const paymentService = {
  /** Create a Razorpay order for a booking */
  async createOrder(payload: {
    bookingId: string;
    amount: number;
    method?: string;
  }): Promise<PaymentOrder> {
    const res = await api.post("/payments/create-order", payload);
    return res.data.data;
  },

  /** Verify payment after Razorpay callback */
  async verifyPayment(payload: {
    bookingId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }): Promise<Payment> {
    const res = await api.post("/payments/verify", payload);
    return res.data.data.payment;
  },

  /** Get payment details for a booking */
  async getPaymentByBooking(bookingId: string): Promise<Payment> {
    const res = await api.get(`/payments/booking/${bookingId}`);
    return res.data.data.payment;
  },
};

export default paymentService;
