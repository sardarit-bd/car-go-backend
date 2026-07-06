import { prisma } from "../../../../lib/prisma.js";
export const createCmsHeroFeature = async (data) => {
    return prisma.cmsHeroFeature.create({ data });
};
export const findAllCmsHeroFeatures = async () => {
    return prisma.cmsHeroFeature.findMany({
        where: { deletedAt: null },
        orderBy: { order: "asc" },
    });
};
export const findCmsHeroFeatureById = async (id) => {
    return prisma.cmsHeroFeature.findUnique({
        where: { id, deletedAt: null },
    });
};
export const updateCmsHeroFeature = async (id, data) => {
    return prisma.cmsHeroFeature.update({
        where: { id },
        data,
    });
};
export const softDeleteCmsHeroFeature = async (id) => {
    return prisma.cmsHeroFeature.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
