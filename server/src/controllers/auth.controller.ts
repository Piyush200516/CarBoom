import { Request, Response } from "express";
import { authService, parseDuration } from "../services/auth.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { config } from "../config/config.js";
import { ApiError } from "../utils/apiError.js";

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const accessExpiryMs = parseDuration(config.JWT_ACCESS_EXPIRY);
  const refreshExpiryMs = parseDuration(config.JWT_REFRESH_EXPIRY);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: accessExpiryMs,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
    maxAge: refreshExpiryMs,
  });
};

const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "none" : "lax",
  });
};

export class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name, phone, role } = req.body;
    const user = await authService.register({
      email,
      passwordHash: password,
      name,
      phone,
      role,
    });

    res
      .status(201)
      .json(new ApiResponse(201, { user }, "User registered successfully"));
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(
      email,
      password
    );

    setAuthCookies(res, accessToken, refreshToken);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken },
          "Logged in successfully"
        )
      );
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    let token = req.cookies.refreshToken;
    if (!token && req.body && req.body.refreshToken) {
      token = req.body.refreshToken;
    }

    if (token) {
      await authService.logout(token);
    }

    clearAuthCookies(res);

    res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {
    let token = req.cookies.refreshToken;
    if (!token && req.body && req.body.refreshToken) {
      token = req.body.refreshToken;
    }

    if (!token) {
      throw new ApiError(401, "Refresh token is missing. Please log in.");
    }

    const { user, accessToken, refreshToken: newRefreshToken } =
      await authService.refresh(token);

    setAuthCookies(res, accessToken, newRefreshToken);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken: newRefreshToken },
          "Tokens refreshed successfully"
        )
      );
  });

  getMe = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const user = await authService.getCurrentUser(req.user.userId);

    res
      .status(200)
      .json(new ApiResponse(200, { user }, "Current user fetched successfully"));
  });

  changePassword = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.user.userId, {
      currentPassword,
      newPassword,
    });

    // Clear authentication cookies since we deleted user refresh tokens on password change
    clearAuthCookies(res);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Password changed successfully. Please log in again."
        )
      );
  });
}

export const authController = new AuthController();
export default authController;
