import { prisma } from "../../../lib/prisma";

export interface VehicleFilters {
  model?: string;
  seats?: number;
  location?: string;
  pickupDate: Date;
  returnDate: Date;
}

export interface PaginationOptions {
  skip: number;
  take: number;
}

const buildWhereClause = (filters: VehicleFilters) => {
  const { model, seats, location, pickupDate, returnDate } = filters;

  return {
    ...(model && { model: { contains: model, mode: "insensitive" as const } }),
    ...(seats !== undefined && { seats: { gte: seats } }),
    ...(location && {
      locations: {
        some: {
          OR: [
            { city: { equals: location, mode: "insensitive" as const } },
            { country: { equals: location, mode: "insensitive" as const } },
          ],
        },
      },
    }),
    bookings: {
      none: {
        status: "CONFIRMED" as const,
        pickupDate: { lt: returnDate },
        returnDate: { gt: pickupDate },
      },
    },
  };
};

export const findAvailableVehicles = async (
  filters: VehicleFilters,
  pagination: PaginationOptions,
) => {
  const where = buildWhereClause(filters);

  // 2. Use the imported 'prisma' instance directly
  return prisma.vehicle.findMany({
    where,
    include: {
      images: true,
      locations: true,
    },
    skip: pagination.skip,
    take: pagination.take,
    orderBy: { createdAt: "desc" },
  });
};

export const countAvailableVehicles = async (filters: VehicleFilters) => {
  const where = buildWhereClause(filters);

  return prisma.vehicle.count({ where });
};