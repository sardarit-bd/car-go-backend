import { prisma } from "../../../lib/prisma";

export const findAllLocations = async () => {
  return prisma.location.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
};

export const findLocationById = async (id: string) => {
  return prisma.location.findFirst({
    where: { id, deletedAt: null },
  });
};

export const createLocation = async (data: any) => {
  return prisma.location.create({
    data,
  });
};

export const updateLocation = async (id: string, data: any) => {
  return prisma.location.update({
    where: { id },
    data,
  });
};

export const softDeleteLocation = async (id: string) => {
  return prisma.location.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};