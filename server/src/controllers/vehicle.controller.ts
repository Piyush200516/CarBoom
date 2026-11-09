import { Request, Response } from "express";
import { vehicleService } from "../services/vehicle.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { VehicleType, FuelType, Transmission, DocumentType } from "@prisma/client";

export class VehicleController {
  /**
   * POST /api/v1/vehicles — Create a new vehicle listing (Owner only)
   */
  createVehicle = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const vehicle = await vehicleService.createVehicle({
      ...req.body,
      ownerId: req.user.userId,
    });

    res.status(201).json(new ApiResponse(201, { vehicle }, "Vehicle listed successfully. Pending approval."));
  });

  /**
   * GET /api/v1/vehicles — Browse approved vehicles with filters
   */
  browseVehicles = asyncHandler(async (req: Request, res: Response) => {
    const {
      type,
      city,
      brand,
      search,
      pickupDate,
      returnDate,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
      seats,
      page,
      limit,
      sortBy,
    } = req.query;

    const result = await vehicleService.browseVehicles({
      type: type as VehicleType,
      city: city as string,
      brand: brand as string,
      search: search as string,
      pickupDate: pickupDate as string,
      returnDate: returnDate as string,
      fuelType: fuelType as FuelType,
      transmission: transmission as Transmission,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      seats: seats ? Number(seats) : undefined,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 12,
      sortBy: sortBy as "price_asc" | "price_desc" | "newest" | "rating",
    });

    res.status(200).json(new ApiResponse(200, result, "Vehicles fetched successfully."));
  });

  /**
   * GET /api/v1/vehicles/owner/me — Get owner's own listings
   */
  getOwnerVehicles = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const vehicles = await vehicleService.getOwnerVehicles(req.user.userId);
    res.status(200).json(new ApiResponse(200, { vehicles }, "Your listings fetched."));
  });

  /**
   * GET /api/v1/vehicles/:id — Get vehicle detail
   */
  getVehicleById = asyncHandler(async (req: Request, res: Response) => {
    const vehicleId = req.params.id as string;
    const vehicle = await vehicleService.getVehicleById(vehicleId);
    res.status(200).json(new ApiResponse(200, { vehicle }, "Vehicle fetched successfully."));
  });

  /**
   * PUT /api/v1/vehicles/:id — Update vehicle (Owner only)
   */
  updateVehicle = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const vehicleId = req.params.id as string;
    const vehicle = await vehicleService.updateVehicle(vehicleId, req.user.userId, req.body);
    res.status(200).json(new ApiResponse(200, { vehicle }, "Vehicle updated successfully."));
  });

  /**
   * DELETE /api/v1/vehicles/:id — Delete vehicle (Owner only)
   */
  deleteVehicle = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const vehicleId = req.params.id as string;
    await vehicleService.deleteVehicle(vehicleId, req.user.userId);
    res.status(200).json(new ApiResponse(200, null, "Vehicle deleted successfully."));
  });

  /**
   * POST /api/v1/vehicles/:id/images — Add images to vehicle
   */
  addImages = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const vehicleId = req.params.id as string;
    const images = await vehicleService.addImages(vehicleId, req.user.userId, req.body.images);
    res.status(201).json(new ApiResponse(201, { images }, "Images added successfully."));
  });

  /**
   * DELETE /api/v1/vehicles/images/:imageId — Delete an image
   */
  deleteImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const imageId = req.params.imageId as string;
    await vehicleService.deleteImage(imageId, req.user.userId);
    res.status(200).json(new ApiResponse(200, null, "Image deleted."));
  });

  /**
   * POST /api/v1/vehicles/:id/documents — Upload document
   */
  addDocument = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const vehicleId = req.params.id as string;
    const doc = await vehicleService.addDocument(vehicleId, req.user.userId, {
      type: req.body.type as DocumentType,
      url: req.body.url,
      publicId: req.body.publicId,
    });
    res.status(201).json(new ApiResponse(201, { doc }, "Document added successfully."));
  });

  /**
   * DELETE /api/v1/vehicles/documents/:docId — Delete a document
   */
  deleteDocument = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const docId = req.params.docId as string;
    await vehicleService.deleteDocument(docId, req.user.userId);
    res.status(200).json(new ApiResponse(200, null, "Document deleted."));
  });
}

export const vehicleController = new VehicleController();
export default vehicleController;
