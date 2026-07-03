// backend/src/modules/reservations/reservation.repository.ts

import { prisma } from "../../../lib/prisma";
import { BookingStatus, Prisma } from "../../../generated/prisma/client"; 

export const findAllReservations = async (page: number, limit: number) => {

  const skip = (page - 1) * limit;


  const [data, total] = await Promise.all([
    prisma.booking.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: { vehicle: true },
      skip,      
      take: limit, 
    }),
    prisma.booking.count({
      where: { deletedAt: null },
    }),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
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

// UPDATED: Replaced `data: any` with Prisma's strict type
export const createReservation = async (data: Prisma.BookingCreateInput) => {
  return prisma.booking.create({
    data,
    include: { vehicle: true },
  });
};

// UPDATED: Replaced `data: any` with Prisma's strict type
export const updateReservation = async (id: string, data: Prisma.BookingUpdateInput) => {
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