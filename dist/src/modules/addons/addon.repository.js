import { prisma } from "../../../lib/prisma.js";
export const findAllAddons = async () => {
    return prisma.addon.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
    });
};
export const findAddonById = async (id) => {
    return prisma.addon.findFirst({
        where: { id, deletedAt: null },
    });
};
export const createAddon = async (data) => {
    return prisma.addon.create({
        data,
    });
};
export const updateAddon = async (id, data) => {
    return prisma.addon.update({
        where: { id },
        data,
    });
};
export const softDeleteAddon = async (id) => {
    return prisma.addon.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
