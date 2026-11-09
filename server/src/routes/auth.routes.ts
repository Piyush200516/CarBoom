import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validator.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
} from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", authLimiter, validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

// Phone OTP Authentication
router.post("/phone-otp/send", authLimiter, authController.sendPhoneOtp);
router.post("/phone-otp/verify", authLimiter, authController.verifyPhoneOtp);

// Social OAuth Login (Google & GitHub)
router.post("/oauth", authController.oauthLogin);
router.get("/google", (req, res) => {
  // OAuth initiation
  res.redirect("/api/v1/auth/google/callback?mock=true");
});
router.get("/google/callback", async (req, res) => {
  const result = await authController.oauthLogin(
    { body: { provider: "google", email: "demo.google@carboom.in", name: "Google User" } } as any,
    res as any,
    (() => {}) as any
  );
  return result;
});
router.get("/github", (req, res) => {
  res.redirect("/api/v1/auth/github/callback?mock=true");
});
router.get("/github/callback", async (req, res) => {
  const result = await authController.oauthLogin(
    { body: { provider: "github", email: "demo.github@carboom.in", name: "GitHub User" } } as any,
    res as any,
    (() => {}) as any
  );
  return result;
});

// Protected routes
router.get("/me", authenticate, authController.getMe);
router.post(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  authController.changePassword
);

export default router;
