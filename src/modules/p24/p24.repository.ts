import { prisma } from "../../../lib/prisma.js";

export const findBookingById = (id: string) =>
  prisma.booking.findUnique({ where: { id } });

export const findBookingByP24SessionId = (sessionId: string) =>
  prisma.booking.findFirst({ where: { p24SessionId: sessionId } });

export const setP24SessionId = (id: string, p24SessionId: string) =>
  prisma.booking.update({ where: { id }, data: { p24SessionId } });

export const markBookingPaid = (id: string, p24OrderId: number) =>
  prisma.booking.update({
    where: { id },
    data: {
      p24OrderId,
      paymentStatus: "PAID",
      status: "CONFIRMED",
    },
  });
