import { logger } from "../config/logger.js";
import { config } from "../config/config.js";

interface StoredOtp {
  otp: string;
  expiresAt: number;
}

class SmsService {
  private otpStore = new Map<string, StoredOtp>();

  /**
   * Send a 6-digit verification OTP to a mobile phone
   */
  async sendOtp(phone: string): Promise<{ success: boolean; message: string; mockOtp?: string }> {
    const cleanPhone = phone.trim().replace(/\D/g, "");
    
    // In mock mode or dev, generate 6-digit OTP
    const otp = process.env.NODE_ENV === "test" ? "123456" : Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    this.otpStore.set(cleanPhone, { otp, expiresAt });

    logger.info(`[SMS Service - ${config.SMS_PROVIDER}] OTP for ${cleanPhone}: ${otp} (expires in 5m)`);

    return {
      success: true,
      message: `OTP sent successfully to ${phone}`,
      mockOtp: config.SMS_PROVIDER === "mock" ? otp : undefined,
    };
  }

  /**
   * Verify an OTP for a given phone number
   */
  verifyOtp(phone: string, inputOtp: string): boolean {
    const cleanPhone = phone.trim().replace(/\D/g, "");
    const stored = this.otpStore.get(cleanPhone);

    // Also support default development OTP 123456 in mock mode
    if (config.SMS_PROVIDER === "mock" && inputOtp === "123456") {
      this.otpStore.delete(cleanPhone);
      return true;
    }

    if (!stored) return false;
    if (Date.now() > stored.expiresAt) {
      this.otpStore.delete(cleanPhone);
      return false;
    }

    if (stored.otp === inputOtp.trim()) {
      this.otpStore.delete(cleanPhone);
      return true;
    }

    return false;
  }

  /**
   * Send SMS alert for booking, payment or return notification
   */
  async sendAlert(phone: string, message: string): Promise<boolean> {
    logger.info(`[SMS Alert - ${config.SMS_PROVIDER}] To: ${phone} | Text: "${message}"`);
    return true;
  }
}

export const smsService = new SmsService();
export default smsService;
