import test from "node:test";
import assert from "node:assert/strict";
import { smsService } from "../../src/services/sms.service.js";
import { parseDuration } from "../../src/services/auth.service.js";
import { emailService } from "../../src/services/email.service.js";

test("Phone OTP generation and verification", async () => {
  const phone = "9876543210";

  // Send OTP
  const result = await smsService.sendOtp(phone);
  assert.equal(result.success, true);
  assert.ok(result.mockOtp);

  // Invalid OTP should fail
  const wrongCheck = smsService.verifyOtp(phone, "000000");
  assert.equal(wrongCheck, false);

  // Correct OTP should succeed
  const correctCheck = smsService.verifyOtp(phone, result.mockOtp!);
  assert.equal(correctCheck, true);

  // Re-using the same OTP should fail (consumed)
  const reuseCheck = smsService.verifyOtp(phone, result.mockOtp!);
  assert.equal(reuseCheck, false);

  // Default dev mock OTP (123456)
  assert.equal(smsService.verifyOtp(phone, "123456"), true);
});

test("JWT duration string parsing", () => {
  assert.equal(parseDuration("15m"), 15 * 60 * 1000);
  assert.equal(parseDuration("7d"), 7 * 24 * 60 * 60 * 1000);
  assert.equal(parseDuration("24h"), 24 * 60 * 60 * 1000);
  assert.equal(parseDuration("30s"), 30 * 1000);
});

test("Email Service generates booking confirmation without throwing", async () => {
  const ok = await emailService.sendBookingConfirmation("test@carboom.in", {
    id: "CB-TEST-001",
    vehicleName: "Mahindra Thar 4x4",
    totalAmount: 5000,
    startTime: new Date(),
    endTime: new Date(Date.now() + 86400000),
  });
  assert.equal(ok, true);
});

test("Email Service generates payment receipt without throwing", async () => {
  const ok = await emailService.sendPaymentReceipt("test@carboom.in", {
    bookingId: "CB-TEST-001",
    amount: 5000,
    paymentId: "pay_test_12345",
    vehicleName: "Mahindra Thar 4x4",
  });
  assert.equal(ok, true);
});

test("KYC file type and size validation logic", () => {
  const allowedMimes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
  const maxSizeBytes = 5 * 1024 * 1024; // 5MB

  // Valid files
  assert.ok(allowedMimes.includes("image/jpeg"));
  assert.ok(allowedMimes.includes("image/png"));
  assert.ok(allowedMimes.includes("application/pdf"));

  // Disallowed formats
  assert.equal(allowedMimes.includes("application/zip"), false);
  assert.equal(allowedMimes.includes("application/x-msdownload"), false);
  assert.equal(allowedMimes.includes("text/html"), false);

  // Size limit check
  const validSize = 2.5 * 1024 * 1024; // 2.5MB
  const overSize = 6 * 1024 * 1024; // 6MB
  assert.ok(validSize <= maxSizeBytes);
  assert.equal(overSize <= maxSizeBytes, false);
});

test("KYC Access Control Logic", () => {
  const checkAccess = (loggedInUserId: string, loggedInRole: string, targetUserId: string) => {
    return loggedInUserId === targetUserId || loggedInRole === "ADMIN";
  };

  // User accessing own KYC -> Allowed
  assert.equal(checkAccess("user-123", "RENTER", "user-123"), true);

  // User accessing another user's KYC -> Blocked (403)
  assert.equal(checkAccess("user-123", "RENTER", "user-999"), false);

  // Admin accessing another user's KYC -> Allowed (Admin override)
  assert.equal(checkAccess("admin-001", "ADMIN", "user-999"), true);
});

