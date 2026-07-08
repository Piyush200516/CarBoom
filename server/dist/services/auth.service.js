"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = exports.parseDuration = void 0;
const user_repository_js_1 = require("../repositories/user.repository.js");
const token_repository_js_1 = require("../repositories/token.repository.js");
const apiError_js_1 = require("../utils/apiError.js");
const password_js_1 = require("../utils/password.js");
const jwt_js_1 = require("../utils/jwt.js");
const config_js_1 = require("../config/config.js");
// Helper to parse simple duration strings (e.g. "7d", "15m", "24h") to milliseconds
const parseDuration = (duration) => {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match)
        return 7 * 24 * 60 * 60 * 1000; // default to 7 days
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case "s": return value * 1000;
        case "m": return value * 60 * 1000;
        case "h": return value * 60 * 60 * 1000;
        case "d": return value * 24 * 60 * 60 * 1000;
        default: return 7 * 24 * 60 * 60 * 1000;
    }
};
exports.parseDuration = parseDuration;
class AuthService {
    async register(data) {
        // Check if email already exists
        const existingUser = await user_repository_js_1.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new apiError_js_1.ApiError(409, "A user with this email already exists");
        }
        // Hash the password
        const hashedPassword = await (0, password_js_1.hashPassword)(data.passwordHash);
        // Create the user
        const user = await user_repository_js_1.userRepository.createUser({
            ...data,
            passwordHash: hashedPassword,
        });
        // Remove password from returned object
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async login(email, passwordHash) {
        // Find user
        const user = await user_repository_js_1.userRepository.findByEmail(email);
        if (!user) {
            throw new apiError_js_1.ApiError(401, "Invalid email or password");
        }
        // Verify password
        const isPasswordValid = await (0, password_js_1.comparePassword)(passwordHash, user.password);
        if (!isPasswordValid) {
            throw new apiError_js_1.ApiError(401, "Invalid email or password");
        }
        // Generate tokens
        const accessToken = (0, jwt_js_1.generateAccessToken)({
            userId: user.id,
            role: user.role,
            email: user.email,
        });
        const refreshToken = (0, jwt_js_1.generateRefreshToken)({ userId: user.id });
        // Calculate expiry date
        const refreshExpiryMs = (0, exports.parseDuration)(config_js_1.config.JWT_REFRESH_EXPIRY);
        const expiresAt = new Date(Date.now() + refreshExpiryMs);
        // Save refresh token
        await token_repository_js_1.tokenRepository.createToken(user.id, refreshToken, expiresAt);
        const { password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            accessToken,
            refreshToken,
        };
    }
    async logout(refreshToken) {
        try {
            // Find token first to see if it exists
            const tokenDoc = await token_repository_js_1.tokenRepository.findToken(refreshToken);
            if (tokenDoc) {
                await token_repository_js_1.tokenRepository.deleteToken(refreshToken);
            }
        }
        catch (error) {
            // Ignore if token not found or already deleted
        }
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new apiError_js_1.ApiError(401, "Refresh token is missing");
        }
        // Verify token
        let decoded;
        try {
            decoded = (0, jwt_js_1.verifyRefreshToken)(refreshToken);
        }
        catch (error) {
            throw new apiError_js_1.ApiError(401, "Invalid or expired refresh token");
        }
        // Check database for token
        const tokenDoc = await token_repository_js_1.tokenRepository.findToken(refreshToken);
        if (!tokenDoc) {
            throw new apiError_js_1.ApiError(401, "Refresh token not found or revoked");
        }
        // Check database token expiration
        if (tokenDoc.expiresAt < new Date()) {
            await token_repository_js_1.tokenRepository.deleteToken(refreshToken);
            throw new apiError_js_1.ApiError(401, "Refresh token has expired");
        }
        // Generate new tokens (Rotation)
        const user = tokenDoc.user;
        const newAccessToken = (0, jwt_js_1.generateAccessToken)({
            userId: user.id,
            role: user.role,
            email: user.email,
        });
        const newRefreshToken = (0, jwt_js_1.generateRefreshToken)({ userId: user.id });
        // Delete old token
        await token_repository_js_1.tokenRepository.deleteToken(refreshToken);
        // Save new refresh token
        const refreshExpiryMs = (0, exports.parseDuration)(config_js_1.config.JWT_REFRESH_EXPIRY);
        const expiresAt = new Date(Date.now() + refreshExpiryMs);
        await token_repository_js_1.tokenRepository.createToken(user.id, newRefreshToken, expiresAt);
        const { password, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    async getCurrentUser(userId) {
        const user = await user_repository_js_1.userRepository.findById(userId);
        if (!user) {
            throw new apiError_js_1.ApiError(404, "User not found");
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async changePassword(userId, data) {
        const user = await user_repository_js_1.userRepository.findById(userId);
        if (!user) {
            throw new apiError_js_1.ApiError(404, "User not found");
        }
        // Compare passwords
        const isPasswordValid = await (0, password_js_1.comparePassword)(data.currentPassword, user.password);
        if (!isPasswordValid) {
            throw new apiError_js_1.ApiError(400, "Incorrect current password");
        }
        // Hash and update to new password
        const hashedNewPassword = await (0, password_js_1.hashPassword)(data.newPassword);
        await user_repository_js_1.userRepository.updatePassword(userId, hashedNewPassword);
        // Optionally: clear all refresh tokens for this user to log them out of other devices
        await token_repository_js_1.tokenRepository.deleteUserTokens(userId);
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
exports.default = exports.authService;
