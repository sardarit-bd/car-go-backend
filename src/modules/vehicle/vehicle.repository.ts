import { prisma } from "../../../lib/prisma.js";

export interface VehicleFilters {
  model?: string;
  search?: string;
  transmission?: string;
  seats?: number;
  location?: string;
  pickupDate: Date;
  returnDate: Date;
  includeInactive?: boolean;
}

export interface PaginationOptions {
  skip: number;
  take: number;
}

const buildWhereClause = (filters: VehicleFilters) => {
  const {
    model,
    search,
    transmission,
    seats,
    pickupDate,
    returnDate,
    includeInactive,
  } = filters;

  return {
    deletedAt: null,
    ...(!includeInactive && { isActive: true }),
    ...(model && { model: { contains: model, mode: "insensitive" as const } }),
    ...(seats !== undefined && { seats: { gte: seats } }),

    ...(search && {
      OR: [
        { brand: { contains: search, mode: "insensitive" as const } },
        { model: { contains: search, mode: "insensitive" as const } },
        { class: { contains: search, mode: "insensitive" as const } },
      ],
    }),

    ...(transmission && {
      transmissionType: { equals: transmission, mode: "insensitive" as const },
    }),

    bookings: {
      none: {
        status: "CONFIRMED" as const,
        deletedAt: null,
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
    where: { id, deletedAt: null, isActive: true },
    include: {
      images: true,
      locations: true,
      availabilities: true,
    },
  });
};

export const findVehicleByIdAdmin = async (id: string) => {
  return prisma.vehicle.findFirst({
    where: { id, deletedAt: null },
    include: {
      images: true,
      locations: true,
      availabilities: true,
    },
  });
};

export const createVehicle = async (data: any) => {
  const { images, locations, availabilities, ...scalarData } = data;

  return prisma.vehicle.create({
    data: {
      ...scalarData,
      images: images && images.length > 0 ? { create: images } : undefined,
      locations:
        locations && locations.length > 0 ? { create: locations } : undefined,
      availabilities:
        availabilities && availabilities.length > 0
          ? { create: availabilities }
          : undefined,
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
  if (images && images.some((img: any) => img.isPrimary)) {
    await prisma.vehicleImage.updateMany({
      where: { vehicleId: id, isPrimary: true },
      data: { isPrimary: false },
    });
  }

  return prisma.vehicle.update({
    where: { id },
    data: {
      ...scalarData,
      images: images && images.length > 0 ? { create: images } : undefined,
      locations: locations ? { deleteMany: {}, create: locations } : undefined,
      availabilities: availabilities
        ? { deleteMany: {}, create: availabilities }
        : undefined,
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
