import { prisma } from "../../../../lib/prisma";



export const createCmsWhyChooseUsFeature = async (data: any) => {
  return prisma.cmsWhyChooseUsFeature.create({ data });
};

export const findAllCmsWhyChooseUsFeatures = async () => {
  return prisma.cmsWhyChooseUsFeature.findMany({
    where: { deletedAt: null },
    orderBy: { order: "asc" },
  });
};

export const findCmsWhyChooseUsFeatureById = async (id: string) => {
  return prisma.cmsWhyChooseUsFeature.findUnique({
    where: { id, deletedAt: null },
  });
};

export const updateCmsWhyChooseUsFeature = async (id: string, data: any) => {
  return prisma.cmsWhyChooseUsFeature.update({
    where: { id },
    data,
  });
};

export const softDeleteCmsWhyChooseUsFeature = async (id: string) => {
  return prisma.cmsWhyChooseUsFeature.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};