// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { userRepository } from "../repositories/user.repository.js";

import fs from "fs";
import path from "path";

export class UserController {
  // GET /users/profile
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }
    const user = await userRepository.findById(req.user.userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { password, ...userWithoutPassword } = user;
    return res
      .status(200)
      .json(new ApiResponse(200, { user: userWithoutPassword }, "User profile fetched"));
  });

  // PUT /users/profile
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }
    const allowedFields = [
      "name",
      "email",
      "phone",
      "gender",
      "dob",
      "city",
      "state",
      "address",
    ];
    const data: any = {};
    for (const field of allowedFields) {
      if (field in req.body) {
        data[field] = req.body[field];
      }
    }
    const updatedUser = await userRepository.updateProfile(req.user.userId, data);
    const { password, ...userWithoutPassword } = updatedUser;
    return res
      .status(200)
      .json(new ApiResponse(200, { user: userWithoutPassword }, "User profile updated"));
  });

  // POST /users/profile/photo
  uploadPhoto = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }
    const file = (req as any).file;
    if (!file) {
      throw new ApiError(400, "No file uploaded");
    }
    const uploadDir = path.join(process.cwd(), "uploads");
    await fs.promises.mkdir(uploadDir, { recursive: true });
    const filename = `${Date.now()}_${file.originalname}`;
    const filePath = path.join(uploadDir, filename);
    await fs.promises.writeFile(filePath, file.buffer);
    const avatarUrl = `/uploads/${filename}`;
    await userRepository.updateProfile(req.user.userId, { avatar: avatarUrl });
    return res
      .status(200)
      .json(new ApiResponse(200, { avatar: avatarUrl }, "Profile photo uploaded"));
  });
}

export const userController = new UserController();
export default userController;
