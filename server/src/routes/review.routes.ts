import { Router } from "express";
import { reviewController } from "../controllers/review.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// Public
router.get("/vehicle/:vehicleId", reviewController.getVehicleReviews);

// Protected
router.post("/", authenticate, reviewController.submitReview);
router.get("/user/me", authenticate, reviewController.getMyReviews);
router.delete("/:id", authenticate, reviewController.deleteReview);

export default router;
