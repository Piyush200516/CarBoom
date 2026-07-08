"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_js_1 = require("../services/auth.service.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
const config_js_1 = require("../config/config.js");
const apiError_js_1 = require("../utils/apiError.js");
const setAuthCookies = (res, accessToken, refreshToken) => {
    const accessExpiryMs = (0, auth_service_js_1.parseDuration)(config_js_1.config.JWT_ACCESS_EXPIRY);
    const refreshExpiryMs = (0, auth_service_js_1.parseDuration)(config_js_1.config.JWT_REFRESH_EXPIRY);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: config_js_1.config.NODE_ENV === "production",
        sameSite: config_js_1.config.NODE_ENV === "production" ? "none" : "lax",
        maxAge: accessExpiryMs,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config_js_1.config.NODE_ENV === "production",
        sameSite: config_js_1.config.NODE_ENV === "production" ? "none" : "lax",
        maxAge: refreshExpiryMs,
    });
};
const clearAuthCookies = (res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: config_js_1.config.NODE_ENV === "production",
        sameSite: config_js_1.config.NODE_ENV === "production" ? "none" : "lax",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: config_js_1.config.NODE_ENV === "production",
        sameSite: config_js_1.config.NODE_ENV === "production" ? "none" : "lax",
    });
};
class AuthController {
    register = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
        const { email, password, name, phone, role } = req.body;
        const user = await auth_service_js_1.authService.register({
            email,
            passwordHash: password,
            name,
            phone,
            role,
        });
        res
            .status(201)
            .json(new apiResponse_js_1.ApiResponse(201, { user }, "User registered successfully"));
    });
    login = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
        const { email, password } = req.body;
        const { user, accessToken, refreshToken } = await auth_service_js_1.authService.login(email, password);
        setAuthCookies(res, accessToken, refreshToken);
        res
            .status(200)
            .json(new apiResponse_js_1.ApiResponse(200, { user, accessToken, refreshToken }, "Logged in successfully"));
    });
    logout = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
        let token = req.cookies.refreshToken;
        if (!token && req.body && req.body.refreshToken) {
            token = req.body.refreshToken;
        }
        if (token) {
            await auth_service_js_1.authService.logout(token);
        }
        clearAuthCookies(res);
        res.status(200).json(new apiResponse_js_1.ApiResponse(200, null, "Logged out successfully"));
    });
    refresh = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
        let token = req.cookies.refreshToken;
        if (!token && req.body && req.body.refreshToken) {
            token = req.body.refreshToken;
        }
        if (!token) {
            throw new apiError_js_1.ApiError(401, "Refresh token is missing. Please log in.");
        }
        const { user, accessToken, refreshToken: newRefreshToken } = await auth_service_js_1.authService.refresh(token);
        setAuthCookies(res, accessToken, newRefreshToken);
        res
            .status(200)
            .json(new apiResponse_js_1.ApiResponse(200, { user, accessToken, refreshToken: newRefreshToken }, "Tokens refreshed successfully"));
    });
    getMe = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
        if (!req.user) {
            throw new apiError_js_1.ApiError(401, "Unauthorized");
        }
        const user = await auth_service_js_1.authService.getCurrentUser(req.user.userId);
        res
            .status(200)
            .json(new apiResponse_js_1.ApiResponse(200, { user }, "Current user fetched successfully"));
    });
    changePassword = (0, asyncHandler_js_1.asyncHandler)(async (req, res) => {
        if (!req.user) {
            throw new apiError_js_1.ApiError(401, "Unauthorized");
        }
        const { currentPassword, newPassword } = req.body;
        await auth_service_js_1.authService.changePassword(req.user.userId, {
            currentPassword,
            newPassword,
        });
        // Clear authentication cookies since we deleted user refresh tokens on password change
        clearAuthCookies(res);
        res
            .status(200)
            .json(new apiResponse_js_1.ApiResponse(200, null, "Password changed successfully. Please log in again."));
    });
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
exports.default = exports.authController;
