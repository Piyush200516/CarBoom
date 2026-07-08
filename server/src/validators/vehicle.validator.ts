import { z } from "zod";

export const createVehicleSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Vehicle name must be at least 2 characters"),
    type: z.enum(["CAR", "BIKE", "SCOOTER", "BICYCLE"]),
    brand: z.string().min(1, "Brand is required"),
    model: z.string().min(1, "Model is required"),
    variant: z.string().optional(),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
    registrationNumber: z.string().min(3, "Registration number is required"),
    fuelType: z.enum(["PETROL", "DIESEL", "CNG", "ELECTRIC"]),
    transmission: z.enum(["MANUAL", "AUTOMATIC"]),
    color: z.string().min(1, "Color is required"),
    seatingCapacity: z.number().int().min(1),
    mileage: z.number().min(0),
    description: z.string().min(10, "Description must be at least 10 characters"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pickupAddress: z.string().min(1, "Pickup address is required"),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    pricePerHour: z.number().min(0),
    pricePerDay: z.number().min(0),
    pricePerWeek: z.number().min(0),
    securityDeposit: z.number().min(0),
  }),
});

export const updateVehicleSchema = z.object({
  body: createVehicleSchema.shape.body.partial(),
});

export const changePricingSchema = z.object({
  body: z.object({
    pricePerHour: z.number().min(0).optional(),
    pricePerDay: z.number().min(0).optional(),
    pricePerWeek: z.number().min(0).optional(),
    securityDeposit: z.number().min(0).optional(),
  }),
});

export const setAvailabilitySchema = z.object({
  body: z.object({
    ranges: z
      .array(
        z.object({
          startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid start date format",
          }),
          endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid end date format",
          }),
          status: z.enum(["AVAILABLE", "BOOKED", "MAINTENANCE"]).default("AVAILABLE"),
        })
      )
      .min(1, "At least one availability range is required"),
  }),
});

export const listVehiclesSchema = z.object({
  query: z.object({
    type: z.enum(["CAR", "BIKE", "SCOOTER", "BICYCLE"]).optional(),
    city: z.string().optional(),
    minPrice: z
      .string()
      .optional()
      .transform((val) => (val ? parseFloat(val) : undefined)),
    maxPrice: z
      .string()
      .optional()
      .transform((val) => (val ? parseFloat(val) : undefined)),
    priceType: z.enum(["hourly", "daily", "weekly"]).default("daily"),
    brand: z.string().optional(),
    fuelType: z.enum(["PETROL", "DIESEL", "CNG", "ELECTRIC"]).optional(),
    transmission: z.enum(["MANUAL", "AUTOMATIC"]).optional(),
    search: z.string().optional(),
    sortBy: z
      .enum([
        "name",
        "brand",
        "pricePerHour",
        "pricePerDay",
        "pricePerWeek",
        "year",
        "createdAt",
      ])
      .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)),
  }),
});

export const updateStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      "APPROVED",
      "REJECTED",
      "UNAVAILABLE",
      "DRAFT",
      "PENDING_APPROVAL",
    ]),
  }),
});
