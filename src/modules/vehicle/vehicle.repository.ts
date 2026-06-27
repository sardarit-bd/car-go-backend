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
    deletedAt: null,
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



export const findVehicleById = async (id: string) => {
  return prisma.vehicle.findFirst({
    where: { id, deletedAt: null },
    include: {
      images: true,
      locations: true,
      availabilities: true,
      // Excluded 'bookings' as per your requirement
    },
  });
};

export const createVehicle = async (data: any) => {
  const { images, locations, availabilities, ...scalarData } = data;

  return prisma.vehicle.create({
    data: {
      ...scalarData,
      images: images && images.length > 0 ? { create: images } : undefined,
      locations: locations && locations.length > 0 ? { create: locations } : undefined,
      availabilities: availabilities && availabilities.length > 0 ? { create: availabilities } : undefined,
    },
    include: {
      images: true,
      locations: true,
      availabilities: true,
    },
  });
};

export const updateVehicle = async (id: string, data: any) => {
  const { images, locations, availabilities, ...scalarData } = data;

  return prisma.vehicle.update({
    where: { id },
    data: {
      ...scalarData,
      // Append new images if provided
      images: images && images.length > 0 ? { create: images } : undefined,
      // Replace locations/availabilities if provided (delete old, create new)
      locations: locations ? { deleteMany: {}, create: locations } : undefined,
      availabilities: availabilities ? { deleteMany: {}, create: availabilities } : undefined,
    },
    include: {
      images: true,
      locations: true,
      availabilities: true,
    },
  });
};

export const softDeleteVehicle = async (id: string) => {
  return prisma.vehicle.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};