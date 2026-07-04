import { prisma } from "../../../lib/prisma";
export const findAllPackages = async () => {
    return prisma.protectionPackage.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
    });
};
export const findPackageById = async (id) => {
    return prisma.protectionPackage.findFirst({
        where: { id, deletedAt: null },
    });
};
export const createPackage = async (data) => {
    return prisma.protectionPackage.create({
        data,
    });
};
export const updatePackage = async (id, data) => {
    return prisma.protectionPackage.update({
        where: { id },
        data,
    });
};
export const softDeletePackage = async (id) => {
    return prisma.protectionPackage.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
