import { prisma } from "../../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma"; // Adjust path if your generated client is elsewhere

export const findAllReservations = async () => {
  return prisma.booking.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { vehicle: true },
  });
};

export const findReservationById = async (id: string) => {
  return prisma.booking.findFirst({
    where: { id, deletedAt: null },
    include: { vehicle: true },
  });
};

export const findReservationsByPhoneNumber = async (phoneNumber: string) => {
  return prisma.booking.findMany({
    where: { phoneNumber, deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: { vehicle: true },
  });
};

export const createReservation = async (data: any) => {
  return prisma.booking.create({
    data,
    include: { vehicle: true },
  });
};

export const updateReservation = async (id: string, data: any) => {
  return prisma.booking.update({
    where: { id },
    data,
    include: { vehicle: true },
  });
};

export const updateReservationStatus = async (id: string, status: BookingStatus) => {
  return prisma.booking.update({
    where: { id },
    data: { status },
  });
};

export const updateReservationQuote = async (id: string, totalPrice: number) => {
  return prisma.booking.update({
    where: { id },
    data: { totalPrice },
  });
};

export const softDeleteReservation = async (id: string) => {
  return prisma.booking.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};