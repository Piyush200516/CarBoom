"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .min(1, "Email is required")
            .email("Invalid email format"),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters"),
        name: zod_1.z
            .string()
            .min(1, "Name is required")
            .min(2, "Name must be at least 2 characters"),
        phone: zod_1.z
            .string()
            .optional()
            .refine((val) => !val || /^[0-9]{10}$/.test(val), {
            message: "Phone number must be a valid 10-digit Indian phone number",
        }),
        role: zod_1.z.enum(["RENTER", "OWNER", "ADMIN"]).default("RENTER"),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .min(1, "Email is required")
            .email("Invalid email format"),
        password: zod_1.z
            .string()
            .min(1, "Password is required"),
    }),
});
exports.changePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z
            .string()
            .min(1, "Current password is required"),
        newPassword: zod_1.z
            .string()
            .min(6, "New password must be at least 6 characters"),
    }),
});
