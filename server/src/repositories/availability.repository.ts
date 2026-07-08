import { prisma } from "../config/db.js";
import { AvailabilityStatus } from "../../generated/prisma/index.js";

export class AvailabilityRepository {
  async getAvailability(vehicleId: string) {
    return prisma.vehicleAvailability.findMany({
      where: { vehicleId },
      orderBy: { startDate: "asc" },
    });
  }

  async clearAvailability(vehicleId: string) {
    return prisma.vehicleAvailability.deleteMany({
      where: { vehicleId },
    });
  }

  async setAvailability(
    vehicleId: string,
    ranges: Array<{
      startDate: Date;
      endDate: Date;
      status: AvailabilityStatus;
    }>
  ) {
    return prisma.$transaction([
      prisma.vehicleAvailability.deleteMany({
        where: { vehicleId },
      }),
      ...ranges.map((range) =>
        prisma.vehicleAvailability.create({
          data: {
            vehicleId,
            startDate: range.startDate,
            endDate: range.endDate,
            status: range.status,
          },
        })
      ),
    ]);
  }
}

export const availabilityRepository = new AvailabilityRepository();
export default availabilityRepository;
