import { prisma } from "../../../../lib/prisma.js";
export const findCmsAboutUs = async () => {
    return prisma.cmsAboutUs.findFirst({
        where: { deletedAt: null },
    });
};
export const findCmsAboutUsById = async (id) => {
    return prisma.cmsAboutUs.findUnique({
        where: { id, deletedAt: null },
    });
};
export const createOrUpdateCmsAboutUs = async (data) => {
    const existing = await prisma.cmsAboutUs.findFirst({
        where: { deletedAt: null },
    });
    if (existing) {
        return prisma.cmsAboutUs.update({
            where: { id: existing.id },
            data,
        });
    }
    return prisma.cmsAboutUs.create({
        data,
    });
};
export const updateCmsAboutUs = async (id, data) => {
    return prisma.cmsAboutUs.update({
        where: { id },
        data,
    });
};
export const softDeleteCmsAboutUs = async (id) => {
    return prisma.cmsAboutUs.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
