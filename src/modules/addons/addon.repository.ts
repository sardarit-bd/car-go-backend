import { prisma } from "../../../lib/prisma.js";

export const findAllAddons = async () => {
  return prisma.addon.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
};

export const findAddonById = async (id: string) => {
  return prisma.addon.findFirst({
    where: { id, deletedAt: null },
  });
};

export const createAddon = async (data: any) => {
  return prisma.addon.create({
    data,
  });
};

export const updateAddon = async (id: string, data: any) => {
  return prisma.addon.update({
    where: { id },
    data,
  });
};

export const softDeleteAddon = async (id: string) => {
  return prisma.addon.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};