import nodemailer from "nodemailer";
import { config } from "../config/config.js";
import { logger } from "../config/logger.js";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    try {
      this.transporter = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        secure: config.SMTP_PORT === 465,
        auth: {
          user: config.SMTP_USER,
          pass: config.SMTP_PASS,
        },
      });
    } catch (err) {
      logger.warn(`[EmailService] Failed to initialize SMTP transporter: ${err}`);
    }
  }

  async sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
    try {
      if (this.transporter && config.SMTP_USER !== "mock_smtp_user") {
        await this.transporter.sendMail({
          from: config.EMAIL_FROM,
          to,
          subject,
          html,
        });
        logger.info(`[EmailService] Real email dispatched to: ${to} | Subject: "${subject}"`);
      } else {
        // Mock mode: log email safely
        logger.info(`[EmailService - Mock] To: ${to} | Subject: "${subject}"`);
      }
      return true;
    } catch (error) {
      logger.warn(`[EmailService] Error dispatching email to ${to}: ${error}`);
      return false;
    }
  }

  async sendBookingConfirmation(to: string, booking: { id: string; vehicleName: string; totalAmount: number; startTime: Date; endTime: Date }) {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
        <h2 style="color: #eab308;">🚗 CarBoom - Booking Confirmed!</h2>
        <p>Dear customer, your booking for <strong>${booking.vehicleName}</strong> has been successfully confirmed.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px 0; color: #64748b;">Booking ID:</td><td style="font-weight: bold;">${booking.id}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Pickup:</td><td>${new Date(booking.startTime).toLocaleString("en-IN")}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Return:</td><td>${new Date(booking.endTime).toLocaleString("en-IN")}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Total Amount:</td><td style="font-weight: bold; color: #22c55e;">₹${booking.totalAmount.toLocaleString("en-IN")}</td></tr>
        </table>
        <p style="margin-top: 20px;">Have a safe and wonderful ride!</p>
      </div>
    `;
    return this.sendEmail({ to, subject: `Booking Confirmed: ${booking.vehicleName} (ID: ${booking.id})`, html });
  }

  async sendPaymentReceipt(to: string, payment: { bookingId: string; amount: number; paymentId: string; vehicleName: string }) {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
        <h2 style="color: #22c55e;">💳 CarBoom - Payment Receipt</h2>
        <p>Thank you! Your payment of <strong>₹${payment.amount.toLocaleString("en-IN")}</strong> for <strong>${payment.vehicleName}</strong> was received.</p>
        <p><strong>Reference / Transaction ID:</strong> ${payment.paymentId}</p>
        <p><strong>Booking ID:</strong> ${payment.bookingId}</p>
      </div>
    `;
    return this.sendEmail({ to, subject: `Payment Receipt: ₹${payment.amount} for ${payment.vehicleName}`, html });
  }
}

export const emailService = new EmailService();
export default emailService;
