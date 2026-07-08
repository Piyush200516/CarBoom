import { prisma } from "../config/db.js";
import {
  VehicleType,
  VehicleStatus,
  FuelType,
  Transmission,
  DocumentType,
} from "../../generated/prisma/index.js";

export class VehicleRepository {
  async createVehicle(data: {
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
    status?: VehicleStatus;
  }) {
    return prisma.vehicle.create({
      data: {
        ...data,
        status: data.status || VehicleStatus.DRAFT,
      },
    });
  }

  async findVehicleById(id: string) {
    return prisma.vehicle.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        images: {
          orderBy: {
            displayOrder: "asc",
          },
        },
        documents: true,
        availabilities: {
          orderBy: {
            startDate: "asc",
          },
        },
      },
    });
  }

  async findVehicles(params: {
    where: any;
    orderBy?: any;
    skip?: number;
    take?: number;
  }) {
    return prisma.vehicle.findMany({
      where: params.where,
      orderBy: params.orderBy,
      skip: params.skip,
      take: params.take,
      include: {
        images: {
          orderBy: {
            displayOrder: "asc",
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async countVehicles(where: any) {
    return prisma.vehicle.count({
      where,
    });
  }

  async updateVehicle(id: string, data: Partial<any>) {
    return prisma.vehicle.update({
      where: { id },
      data,
    });
  }

  async deleteVehicle(id: string) {
    return prisma.vehicle.delete({
      where: { id },
    });
  }

  async addImages(
    vehicleId: string,
    images: Array<{
      url: string;
      publicId?: string;
      isPrimary?: boolean;
      displayOrder?: number;
    }>
  ) {
    return prisma.$transaction(
      images.map((img) =>
        prisma.vehicleImage.create({
          data: {
            vehicleId,
            url: img.url,
            publicId: img.publicId || null,
            isPrimary: img.isPrimary || false,
            displayOrder: img.displayOrder || 0,
          },
        })
      )
    );
  }

  async addDocument(
    vehicleId: string,
    data: {
      type: DocumentType;
      url: string;
      publicId?: string;
    }
  ) {
    return prisma.vehicleDocument.create({
      data: {
        vehicleId,
        type: data.type,
        url: data.url,
        publicId: data.publicId || null,
      },
    });
  }

  async findImageById(imageId: string) {
    return prisma.vehicleImage.findUnique({
      where: { id: imageId },
    });
  }

  async deleteImage(imageId: string) {
    return prisma.vehicleImage.delete({
      where: { id: imageId },
    });
  }

  async findDocumentById(docId: string) {
    return prisma.vehicleDocument.findUnique({
      where: { id: docId },
    });
  }

  async deleteDocument(docId: string) {
    return prisma.vehicleDocument.delete({
      where: { id: docId },
    });
  }
}

export const vehicleRepository = new VehicleRepository();
export default vehicleRepository;
