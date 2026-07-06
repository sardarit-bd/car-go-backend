import { prisma } from "../../../../lib/prisma.js";
export const createCmsHero = async (data) => {
    // Only one hero section should exist
    const existing = await prisma.cmsHero.findFirst({
        where: { deletedAt: null },
    });
    if (existing) {
        return prisma.cmsHero.update({
            where: { id: existing.id },
            data,
        });
    }
    return prisma.cmsHero.create({ data });
};
export const findCmsHero = async () => {
    return prisma.cmsHero.findFirst({
        where: { deletedAt: null },
    });
};
export const findCmsHeroById = async (id) => {
    return prisma.cmsHero.findUnique({
        where: { id, deletedAt: null },
    });
};
export const updateCmsHero = async (id, data) => {
    return prisma.cmsHero.update({
        where: { id },
        data,
    });
};
export const softDeleteCmsHero = async (id) => {
    return prisma.cmsHero.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
