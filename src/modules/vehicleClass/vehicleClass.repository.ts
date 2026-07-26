import { prisma } from "../../../lib/prisma.js";

export const findAllVehicleClasses = async () => {
  return prisma.vehicleClass.findMany({
    where: { deletedAt: null },
    orderBy: { name: "asc" },
  });
};

export const findVehicleClassById = async (id: string) => {
  return prisma.vehicleClass.findFirst({
    where: { id, deletedAt: null },
  });
};

export const createVehicleClass = async (data: { name: string }) => {
  return prisma.vehicleClass.create({ data });
};

export const updateVehicleClass = async (
  id: string,
  data: { name: string },
) => {
  return prisma.vehicleClass.update({
    where: { id },
    data,
  });
};

export const softDeleteVehicleClass = async (id: string) => {
  return prisma.vehicleClass.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
