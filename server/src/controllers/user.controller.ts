// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { userRepository } from "../repositories/user.repository.js";

import fs from "fs";
import path from "path";
import { prisma } from "../config/db.js";

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

  // POST /users/kyc
  uploadKyc = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    // Access control: User can only upload KYC for themselves unless ADMIN
    const targetUserId = req.body.userId || req.user.userId;
    if (targetUserId !== req.user.userId && req.user.role !== "ADMIN") {
      throw new ApiError(403, "Access denied. You can only manage your own KYC documents.");
    }

    let documentUrl = req.body.documentUrl;
    const file = (req as any).file;

    if (file) {
      // Validate file size limit (5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new ApiError(400, "File size exceeds the 5MB limit.");
      }

      // Validate allowed mime types (jpg, png, pdf)
      const allowedMimes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
      if (!allowedMimes.includes(file.mimetype)) {
        throw new ApiError(400, "Invalid file format. Only JPEG, PNG, and PDF files are allowed.");
      }

      const uploadDir = path.join(process.cwd(), "uploads", "kyc");
      await fs.promises.mkdir(uploadDir, { recursive: true });
      const safeBasename = path.basename(file.originalname).replace(/[^a-zA-Z0-9.-]/g, "_");
      const filename = `${Date.now()}_${safeBasename}`;
      const filePath = path.join(uploadDir, filename);
      await fs.promises.writeFile(filePath, file.buffer);
      documentUrl = `/uploads/kyc/${filename}`;
    }

    if (!documentUrl) {
      throw new ApiError(400, "Please upload a Driving License or Aadhaar document, or provide documentUrl.");
    }

    const verification = await prisma.ownerVerification.upsert({
      where: { userId: targetUserId },
      update: {
        documentUrl,
        status: "APPROVED", // Auto-approved for verified mock or pending
      },
      create: {
        userId: targetUserId,
        documentUrl,
        status: "APPROVED",
      },
    });

    await prisma.user.update({
      where: { id: targetUserId },
      data: { isVerified: true },
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        { verification, isVerified: true },
        "Driving License / KYC document uploaded and verified successfully."
      )
    );
  });

  // GET /users/kyc
  getKycStatus = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    // Access control: User can only view their own KYC status unless ADMIN
    const targetUserId = (req.query.userId as string) || req.user.userId;
    if (targetUserId !== req.user.userId && req.user.role !== "ADMIN") {
      throw new ApiError(403, "Access denied. You can only view your own KYC status.");
    }

    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { isVerified: true, ownerVerification: true },
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          isVerified: !!user?.isVerified,
          kyc: user?.ownerVerification || null,
        },
        "KYC status retrieved."
      )
    );
  });
}

export const userController = new UserController();
export default userController;
