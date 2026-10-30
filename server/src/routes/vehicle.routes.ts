import { Router } from "express";
import { vehicleController } from "../controllers/vehicle.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", vehicleController.browseVehicles);
router.get("/:id", vehicleController.getVehicleById);

// Owner-only routes
router.post("/", authenticate, authorize("OWNER", "ADMIN"), vehicleController.createVehicle);
router.get("/owner/me", authenticate, vehicleController.getOwnerVehicles);
router.put("/:id", authenticate, authorize("OWNER", "ADMIN"), vehicleController.updateVehicle);
router.delete("/:id", authenticate, authorize("OWNER", "ADMIN"), vehicleController.deleteVehicle);

// Image management
router.post("/:id/images", authenticate, authorize("OWNER", "ADMIN"), vehicleController.addImages);
router.delete("/images/:imageId", authenticate, vehicleController.deleteImage);

// Document management
router.post("/:id/documents", authenticate, authorize("OWNER", "ADMIN"), vehicleController.addDocument);
router.delete("/documents/:docId", authenticate, vehicleController.deleteDocument);

export default router;
