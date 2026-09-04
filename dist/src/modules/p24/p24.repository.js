import { prisma } from "../../../lib/prisma.js";
export const findBookingById = (id) => prisma.booking.findUnique({ where: { id } });
export const findBookingByP24SessionId = (sessionId) => prisma.booking.findFirst({ where: { p24SessionId: sessionId } });
export const setP24SessionId = (id, p24SessionId) => prisma.booking.update({ where: { id }, data: { p24SessionId } });
export const markBookingPaid = (id, p24OrderId) => prisma.booking.update({
    where: { id },
    data: {
        p24OrderId,
        paymentStatus: "PAID",
        status: "CONFIRMED",
    },
});
