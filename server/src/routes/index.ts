import { Router } from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import vehicleRouter from "./vehicle.routes.js";
import bookingRouter from "./booking.routes.js";
import paymentRouter from "./payment.routes.js";
import reviewRouter from "./review.routes.js";
import notificationRouter from "./notification.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/vehicles", vehicleRouter);
router.use("/bookings", bookingRouter);
router.use("/payments", paymentRouter);
router.use("/reviews", reviewRouter);
router.use("/notifications", notificationRouter);

export default router;

