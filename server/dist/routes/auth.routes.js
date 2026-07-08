"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const validator_middleware_js_1 = require("../middleware/validator.middleware.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const rateLimit_middleware_js_1 = require("../middleware/rateLimit.middleware.js");
const auth_validator_js_1 = require("../validators/auth.validator.js");
const router = (0, express_1.Router)();
router.post("/register", (0, validator_middleware_js_1.validate)(auth_validator_js_1.registerSchema), auth_controller_js_1.authController.register);
router.post("/login", rateLimit_middleware_js_1.authLimiter, (0, validator_middleware_js_1.validate)(auth_validator_js_1.loginSchema), auth_controller_js_1.authController.login);
router.post("/logout", auth_controller_js_1.authController.logout);
router.post("/refresh", auth_controller_js_1.authController.refresh);
// Protected routes
router.get("/me", auth_middleware_js_1.authenticate, auth_controller_js_1.authController.getMe);
router.post("/change-password", auth_middleware_js_1.authenticate, (0, validator_middleware_js_1.validate)(auth_validator_js_1.changePasswordSchema), auth_controller_js_1.authController.changePassword);
exports.default = router;
