import { vehicleRepository } from "../repositories/vehicle.repository.js";
import { ApiError } from "../utils/apiError.js";
import {
  VehicleType,
  VehicleStatus,
  FuelType,
  Transmission,
  DocumentType,
} from "@prisma/client";
import { prisma } from "../config/db.js";

interface CreateVehicleInput {
  name: string;
  type: VehicleType;
  brand: string;
  model: string;
  variant?: string;
  year: number;
  registrationNumber: string;
  fuelType: FuelType;
  transmission: Transmission;
  color: string;
  seatingCapacity: number;
  mileage: number;
  description: string;
  city: string;
  state: string;
  pickupAddress: string;
  latitude: number;
  longitude: number;
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
  securityDeposit: number;
  ownerId: string;
}

interface VehicleBrowseFilters {
  type?: VehicleType;
  city?: string;
  fuelType?: FuelType;
  transmission?: Transmission;
  minPrice?: number;
  maxPrice?: number;
  seats?: number;
  page?: number;
  limit?: number;
  sortBy?: "price_asc" | "price_desc" | "newest" | "rating";
}

export class VehicleService {
  async createVehicle(input: CreateVehicleInput) {
    // Verify registration number uniqueness
    const existing = await prisma.vehicle.findFirst({
      where: { registrationNumber: input.registrationNumber },
    });
    if (existing) {
      throw new ApiError(409, "A vehicle with this registration number already exists.");
    }

    return vehicleRepository.createVehicle({
      ...input,
      status: VehicleStatus.PENDING_APPROVAL,
    });
  }

  async getVehicleById(id: string) {
    const vehicle = await vehicleRepository.findVehicleById(id);
    if (!vehicle) {
      throw new ApiError(404, "Vehicle not found.");
    }
    return vehicle;
  }

  async browseVehicles(filters: VehicleBrowseFilters) {
    const {
      type,
      city,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
      seats,
      page = 1,
      limit = 12,
      sortBy = "newest",
    } = filters;

    const where: Record<string, unknown> = {
      status: VehicleStatus.APPROVED,
    };

    if (type) where.type = type;
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (fuelType) where.fuelType = fuelType;
    if (transmission) where.transmission = transmission;
    if (seats) where.seatingCapacity = { gte: seats };

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.pricePerDay = {
        ...(minPrice !== undefined ? { gte: minPrice } : {}),
        ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
      };
    }

    const orderByMap: Record<string, unknown> = {
      price_asc: { pricePerDay: "asc" },
      price_desc: { pricePerDay: "desc" },
      newest: { createdAt: "desc" },
      rating: { createdAt: "desc" }, // placeholder until avg rating column
    };
    const orderBy = orderByMap[sortBy] || { createdAt: "desc" };

    const skip = (page - 1) * limit;

    const [vehicles, total] = await Promise.all([
      vehicleRepository.findVehicles({ where, orderBy, skip, take: limit }),
      vehicleRepository.countVehicles(where),
    ]);

    return {
      vehicles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  async getOwnerVehicles(ownerId: string) {
    return vehicleRepository.findVehicles({
      where: { ownerId },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateVehicle(id: string, ownerId: string, data: Partial<CreateVehicleInput>) {
    const vehicle = await vehicleRepository.findVehicleById(id);
    if (!vehicle) throw new ApiError(404, "Vehicle not found.");
    if (vehicle.ownerId !== ownerId) throw new ApiError(403, "Not authorized to edit this vehicle.");
    return vehicleRepository.updateVehicle(id, data);
  }

  async deleteVehicle(id: string, ownerId: string) {
    const vehicle = await vehicleRepository.findVehicleById(id);
    if (!vehicle) throw new ApiError(404, "Vehicle not found.");
    if (vehicle.ownerId !== ownerId) throw new ApiError(403, "Not authorized to delete this vehicle.");
    return vehicleRepository.deleteVehicle(id);
  }

  async addImages(vehicleId: string, ownerId: string, images: Array<{ url: string; publicId?: string; isPrimary?: boolean; displayOrder?: number }>) {
    const vehicle = await vehicleRepository.findVehicleById(vehicleId);
    if (!vehicle) throw new ApiError(404, "Vehicle not found.");
    if (vehicle.ownerId !== ownerId) throw new ApiError(403, "Not authorized.");
    return vehicleRepository.addImages(vehicleId, images);
  }

  async addDocument(vehicleId: string, ownerId: string, data: { type: DocumentType; url: string; publicId?: string }) {
    const vehicle = await vehicleRepository.findVehicleById(vehicleId);
    if (!vehicle) throw new ApiError(404, "Vehicle not found.");
    if (vehicle.ownerId !== ownerId) throw new ApiError(403, "Not authorized.");
    return vehicleRepository.addDocument(vehicleId, data);
  }

  async deleteImage(imageId: string, ownerId: string) {
    const image = await vehicleRepository.findImageById(imageId);
    if (!image) throw new ApiError(404, "Image not found.");
    const vehicle = await vehicleRepository.findVehicleById(image.vehicleId);
    if (!vehicle || vehicle.ownerId !== ownerId) throw new ApiError(403, "Not authorized.");
    return vehicleRepository.deleteImage(imageId);
  }

  async deleteDocument(docId: string, ownerId: string) {
    const doc = await vehicleRepository.findDocumentById(docId);
    if (!doc) throw new ApiError(404, "Document not found.");
    const vehicle = await vehicleRepository.findVehicleById(doc.vehicleId);
    if (!vehicle || vehicle.ownerId !== ownerId) throw new ApiError(403, "Not authorized.");
    return vehicleRepository.deleteDocument(docId);
  }
}

export const vehicleService = new VehicleService();
export default vehicleService;
