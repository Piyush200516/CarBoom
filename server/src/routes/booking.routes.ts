import { Router } from "express";
import { bookingController } from "../controllers/booking.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// All booking routes require authentication
router.use(authenticate);

router.post("/calculate", bookingController.calculatePrice);
router.post("/", bookingController.createBooking);
router.get("/my", bookingController.getMyBookings);
router.get("/owner", bookingController.getOwnerBookings);
router.get("/owner/analytics", bookingController.getOwnerAnalytics);
router.get("/:id", bookingController.getBookingById);
router.patch("/:id/status", bookingController.updateBookingStatus);
router.post("/:id/cancel", bookingController.cancelBooking);

export default router;
