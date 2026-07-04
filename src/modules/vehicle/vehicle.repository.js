import { prisma } from "../../../lib/prisma";
const buildWhereClause = (filters) => {
    const { model, search, transmission, seats, pickupDate, returnDate } = filters;
    return {
        deletedAt: null,
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
            transmission: { equals: transmission, mode: "insensitive" },
        }),
        bookings: {
            none: {
                status: "CONFIRMED",
                deletedAt: null,
                pickupDate: { lt: returnDate },
                returnDate: { gt: pickupDate },
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
            availabilities: availabilities && availabilities.length > 0 ? { create: availabilities } : undefined,
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
    return prisma.vehicle.update({
        where: { id },
        data: {
            ...scalarData,
            images: images && images.length > 0 ? { create: images } : undefined,
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
export const softDeleteVehicle = async (id) => {
    return prisma.vehicle.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
