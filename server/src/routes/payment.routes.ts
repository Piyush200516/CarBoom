import { Router } from "express";
import { paymentController } from "../controllers/payment.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/create-order", paymentController.createOrder);
router.post("/verify", paymentController.verifyPayment);
router.post("/refund", paymentController.processRefund);
router.get("/booking/:bookingId", paymentController.getPaymentByBooking);

export default router;
