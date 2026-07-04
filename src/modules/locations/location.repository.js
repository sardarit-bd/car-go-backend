import { prisma } from "../../../lib/prisma";
export const findAllLocations = async () => {
    return prisma.location.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
    });
};
export const findLocationById = async (id) => {
    return prisma.location.findFirst({
        where: { id, deletedAt: null },
    });
};
export const createLocation = async (data) => {
    return prisma.location.create({
        data,
    });
};
export const updateLocation = async (id, data) => {
    return prisma.location.update({
        where: { id },
        data,
    });
};
export const softDeleteLocation = async (id) => {
    return prisma.location.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
