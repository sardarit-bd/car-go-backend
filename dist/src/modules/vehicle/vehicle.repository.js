import { prisma } from "../../../lib/prisma.js";
const buildWhereClause = (filters) => {
    const { model, search, transmission, seats, pickupDate, returnDate, includeInactive, } = filters;
    return {
        deletedAt: null,
        ...(!includeInactive && { isActive: true }),
        ...(model && { model: { contains: model, mode: "insensitive" } }),
        ...(seats !== undefined && { seats: { gte: seats } }),
        ...(search && {
            OR: [
                { brand: { contains: search, mode: "insensitive" } },
                { model: { contains: search, mode: "insensitive" } },
                { class: { contains: search, mode: "insensitive" } },
            ],
        }),
        ...(transmission && {
            transmissionType: { equals: transmission, mode: "insensitive" },
        }),
        bookings: {
            none: {
                status: "CONFIRMED",
                deletedAt: null,
                pickupDate: { lt: returnDate },
                returnDate: { gt: pickupDate },
            },
        },
        availabilities: {
            none: {
                isBlocked: true,
                availableFrom: { lt: returnDate },
                availableTo: { gt: pickupDate },
            },
        },
    };
};
export const findAvailableVehicles = async (filters, pagination) => {
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
export const countAvailableVehicles = async (filters) => {
    const where = buildWhereClause(filters);
    return prisma.vehicle.count({ where });
};
export const findVehicleById = async (id) => {
    return prisma.vehicle.findFirst({
        where: { id, deletedAt: null, isActive: true },
        include: {
            images: true,
            locations: true,
            availabilities: true,
        },
    });
};
export const findVehicleByIdAdmin = async (id) => {
    return prisma.vehicle.findFirst({
        where: { id, deletedAt: null },
        include: {
            images: true,
            locations: true,
            availabilities: true,
        },
    });
};
export const createVehicle = async (data) => {
    const { images, locations, availabilities, ...scalarData } = data;
    return prisma.vehicle.create({
        data: {
            ...scalarData,
            images: images && images.length > 0 ? { create: images } : undefined,
            locations: locations && locations.length > 0 ? { create: locations } : undefined,
            availabilities: availabilities && availabilities.length > 0
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
export const updateVehicle = async (id, data) => {
    const { images, locations, availabilities, ...scalarData } = data;
    if (images && images.some((img) => img.isPrimary)) {
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
export const softDeleteVehicle = async (id) => {
    return prisma.vehicle.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
export const findBlockedAvailabilities = async (vehicleId) => {
    return prisma.vehicleAvailability.findMany({
        where: { vehicleId, isBlocked: true },
        orderBy: { availableFrom: "asc" },
    });
};
export const findOverlappingBlockedAvailability = async (vehicleId, pickupDate, returnDate) => {
    return prisma.vehicleAvailability.findMany({
        where: {
            vehicleId,
            isBlocked: true,
            availableFrom: { lt: returnDate },
            availableTo: { gt: pickupDate },
        },
    });
};
export const createBlockedAvailability = async (vehicleId, availableFrom, availableTo) => {
    return prisma.vehicleAvailability.create({
        data: { vehicleId, availableFrom, availableTo, isBlocked: true },
    });
};
export const deleteBlockedAvailability = async (id) => {
    return prisma.vehicleAvailability.delete({ where: { id } });
};
