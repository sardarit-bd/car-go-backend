import {prisma}  from "../../../../lib/prisma.js";



export const createCmsHeroFeature = async (data: any) => {
  return prisma.cmsHeroFeature.create({ data });
};

export const findAllCmsHeroFeatures = async () => {
  return prisma.cmsHeroFeature.findMany({
    where: { deletedAt: null },
    orderBy: { order: "asc" },
  });
};

export const findCmsHeroFeatureById = async (id: string) => {
  return prisma.cmsHeroFeature.findUnique({
    where: { id, deletedAt: null },
  });
};

export const updateCmsHeroFeature = async (id: string, data: any) => {
  return prisma.cmsHeroFeature.update({
    where: { id },
    data,
  });
};

export const softDeleteCmsHeroFeature = async (id: string) => {
  return prisma.cmsHeroFeature.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};