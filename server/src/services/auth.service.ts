import { userRepository } from "../repositories/user.repository.js";
import { tokenRepository } from "../repositories/token.repository.js";
import { ApiError } from "../utils/apiError.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import { config } from "../config/config.js";
import { Role } from "@prisma/client";
import { logger } from "../config/logger.js";

// Helper to parse simple duration strings (e.g. "7d", "15m", "24h") to milliseconds
export const parseDuration = (duration: string): number => {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000; // default to 7 days
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

export class AuthService {
  async register(data: {
    email: string;
    passwordHash: string;
    name: string;
    phone?: string;
    role?: Role;
  }) {
    // Check if email already exists
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ApiError(409, "A user with this email already exists");
    }

    // Hash the password
    logger.info(`[Auth Service] Hashing password for email: ${data.email}`);
    const hashedPassword = await hashPassword(data.passwordHash);

    // Create the user
    logger.info(`[Auth Service] Inserting new user into database: ${data.email}`);
    const user = await userRepository.createUser({
      ...data,
      passwordHash: hashedPassword,
    });

    logger.info(`[Auth Service] User inserted successfully: ${user.id}`);

    // Remove password from returned object
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, passwordHash: string) {
    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Verify password
    logger.info(`[Auth Service] Verifying password for email: ${email}`);
    const isPasswordValid = await comparePassword(passwordHash, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    logger.info(`[Auth Service] Generating tokens for user: ${user.id}`);
    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({ userId: user.id });

    // Calculate expiry date
    const refreshExpiryMs = parseDuration(config.JWT_REFRESH_EXPIRY);
    const expiresAt = new Date(Date.now() + refreshExpiryMs);

    // Save refresh token
    await tokenRepository.createToken(user.id, refreshToken, expiresAt);

    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async logout(refreshToken: string) {
    try {
      // Find token first to see if it exists
      const tokenDoc = await tokenRepository.findToken(refreshToken);
      if (tokenDoc) {
        await tokenRepository.deleteToken(refreshToken);
      }
    } catch (error) {
      // Ignore if token not found or already deleted
    }
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new ApiError(401, "Refresh token is missing");
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    // Check database for token
    const tokenDoc = await tokenRepository.findToken(refreshToken);
    if (!tokenDoc) {
      throw new ApiError(401, "Refresh token not found or revoked");
    }

    // Check database token expiration
    if (tokenDoc.expiresAt < new Date()) {
      await tokenRepository.deleteToken(refreshToken);
      throw new ApiError(401, "Refresh token has expired");
    }

    // Generate new tokens (Rotation)
    const user = tokenDoc.user;
    const newAccessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
      email: user.email,
    });
    const newRefreshToken = generateRefreshToken({ userId: user.id });

    // Delete old token
    await tokenRepository.deleteToken(refreshToken);

    // Save new refresh token
    const refreshExpiryMs = parseDuration(config.JWT_REFRESH_EXPIRY);
    const expiresAt = new Date(Date.now() + refreshExpiryMs);
    await tokenRepository.createToken(user.id, newRefreshToken, expiresAt);

    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async changePassword(userId: string, data: { currentPassword: string; newPassword: string }) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(data.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Incorrect current password");
    }

    // Hash and update to new password
    const hashedNewPassword = await hashPassword(data.newPassword);
    await userRepository.updatePassword(userId, hashedNewPassword);

    // Optionally: clear all refresh tokens for this user to log them out of other devices
    await tokenRepository.deleteUserTokens(userId);
  }

  /**
   * Logout from all devices — deletes every refresh token belonging to this user.
   * This invalidates all active sessions across all devices.
   */
  async logoutAll(userId: string) {
    // Verify the user actually exists before nuking tokens
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Delete all refresh tokens for this user in a single atomic operation
    const result = await tokenRepository.deleteUserTokens(userId);

    logger.info(
      `[Auth Service] Logout-all executed for userId: ${userId} at ${new Date().toISOString()} — ${result.count} token(s) invalidated`
    );

    return { deletedCount: result.count };
  }
}

export const authService = new AuthService();
export default authService;
