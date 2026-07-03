import {prisma}  from "../../../../lib/prisma";



export const createCmsSocialMedia = async (data: any) => {
  return prisma.cmsSocialMedia.create({ data });
};

export const findAllCmsSocialMedia = async () => {
  return prisma.cmsSocialMedia.findMany({
    where: { deletedAt: null },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
};

export const findCmsSocialMediaById = async (id: string) => {
  return prisma.cmsSocialMedia.findUnique({
    where: { id, deletedAt: null },
  });
};

export const updateCmsSocialMedia = async (id: string, data: any) => {
  return prisma.cmsSocialMedia.update({
    where: { id },
    data,
  });
};

export const softDeleteCmsSocialMedia = async (id: string) => {
  return prisma.cmsSocialMedia.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};