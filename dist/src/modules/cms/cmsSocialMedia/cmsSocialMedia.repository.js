import { prisma } from "../../../../lib/prisma.js";
export const createCmsSocialMedia = async (data) => {
    return prisma.cmsSocialMedia.create({ data });
};
export const findAllCmsSocialMedia = async () => {
    return prisma.cmsSocialMedia.findMany({
        where: { deletedAt: null },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
};
export const findCmsSocialMediaById = async (id) => {
    return prisma.cmsSocialMedia.findUnique({
        where: { id, deletedAt: null },
    });
};
export const updateCmsSocialMedia = async (id, data) => {
    return prisma.cmsSocialMedia.update({
        where: { id },
        data,
    });
};
export const softDeleteCmsSocialMedia = async (id) => {
    return prisma.cmsSocialMedia.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
