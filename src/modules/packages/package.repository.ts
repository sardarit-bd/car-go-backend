import { prisma } from "../../../lib/prisma.js";

export const findAllPackages = async () => {
  return prisma.protectionPackage.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
};

export const findPackageById = async (id: string) => {
  return prisma.protectionPackage.findFirst({
    where: { id, deletedAt: null },
  });
};

export const createPackage = async (data: any) => {
  return prisma.protectionPackage.create({
    data,
  });
};

export const updatePackage = async (id: string, data: any) => {
  return prisma.protectionPackage.update({
    where: { id },
    data,
  });
};

export const softDeletePackage = async (id: string) => {
  return prisma.protectionPackage.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};