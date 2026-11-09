// src/routes/user.routes.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { userController } from "../controllers/user.controller.js";
import { uploadImage, uploadKycDocument } from "../middleware/upload.middleware.js";

const router = Router();

// Get authenticated user's profile
router.get("/profile", authenticate, userController.getProfile);

// Update authenticated user's profile (partial update)
router.put("/profile", authenticate, userController.updateProfile);

// Upload profile photo
router.post("/profile/photo", authenticate, uploadImage.single("photo"), userController.uploadPhoto);

// Driving License / KYC Verification (Only self or admin, max 5MB, JPG/PNG/PDF only)
router.get("/kyc", authenticate, userController.getKycStatus);
router.post("/kyc", authenticate, uploadKycDocument.single("document"), userController.uploadKyc);

export default router;
