import {prisma}  from "../../../../lib/prisma";



export const createCmsPage = async (data: any) => {
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

export const findCmsPageById = async (id: string) => {
  return prisma.cmsPage.findUnique({
    where: { id, deletedAt: null },
  });
};

export const findCmsPageByType = async (type: string) => {
  return prisma.cmsPage.findUnique({
    where: { type, deletedAt: null },
  });
};

export const updateCmsPage = async (id: string, data: any) => {
  return prisma.cmsPage.update({
    where: { id },
    data,
  });
};

export const softDeleteCmsPage = async (id: string) => {
  return prisma.cmsPage.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};