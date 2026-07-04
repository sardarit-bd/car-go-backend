import { prisma } from "../../../../lib/prisma";
export const createCmsPage = async (data) => {
    return prisma.cmsPage.upsert({
        where: { type: data.type },
        update: data,
        create: data,
    });
};
export const findAllCmsPages = async () => {
    return prisma.cmsPage.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
    });
};
export const findCmsPageById = async (id) => {
    return prisma.cmsPage.findUnique({
        where: { id, deletedAt: null },
    });
};
export const findCmsPageByType = async (type) => {
    return prisma.cmsPage.findUnique({
        where: { type, deletedAt: null },
    });
};
export const updateCmsPage = async (id, data) => {
    return prisma.cmsPage.update({
        where: { id },
        data,
    });
};
export const softDeleteCmsPage = async (id) => {
    return prisma.cmsPage.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
