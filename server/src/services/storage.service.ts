import fs from "fs";
import path from "path";
import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary.js";
import { ApiError } from "../utils/apiError.js";
import { logger } from "../config/logger.js";


export class StorageService {
  async uploadFile(
    file: Express.Multer.File,
    folder: string
  ): Promise<{ url: string; publicId: string }> {
    if (!file) {
      throw new ApiError(400, "No file provided for upload");
    }

    if (isCloudinaryConfigured) {
      return this.uploadToCloudinary(file, folder);
    } else {
      return this.uploadToLocal(file, folder);
    }
  }

  async deleteFile(publicId: string): Promise<void> {
    if (!publicId) return;

    if (isCloudinaryConfigured) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error: any) {
        logger.error(`Failed to delete file from Cloudinary: ${error.message}`);
      }
    } else {
      // Local delete
      const filePath = path.join(__dirname, "../../../", publicId);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (error: any) {
          logger.error(`Failed to delete local file: ${error.message}`);
        }
      }
    }
  }

  private async uploadToCloudinary(
    file: Express.Multer.File,
    folder: string
  ): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: `carboom/${folder}` },
        (error, result) => {
          if (error) {
            logger.error(`Cloudinary upload error: ${error.message}`);
            return reject(new ApiError(500, "Failed to upload file to cloud storage"));
          }
          if (!result) {
            return reject(new ApiError(500, "Cloud storage upload returned empty response"));
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );

      uploadStream.end(file.buffer);
    });
  }

  private async uploadToLocal(
    file: Express.Multer.File,
    folder: string
  ): Promise<{ url: string; publicId: string }> {
    try {
      // Define local upload dir
      const uploadDir = path.join(__dirname, "../../../uploads", folder);
      
      // Ensure folder exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate unique name
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const filePath = path.join(uploadDir, fileName);

      // Write file
      fs.writeFileSync(filePath, file.buffer);

      // URL path that client can query (e.g. /uploads/images/filename.jpg)
      const relativeUrl = `/uploads/${folder}/${fileName}`;
      const publicId = `uploads/${folder}/${fileName}`;

      logger.info(`File uploaded locally: ${relativeUrl}`);

      return {
        url: relativeUrl,
        publicId,
      };
    } catch (error: any) {
      logger.error(`Local upload error: ${error.message}`);
      throw new ApiError(500, "Failed to save file locally");
    }
  }
}

export const storageService = new StorageService();
export default storageService;
