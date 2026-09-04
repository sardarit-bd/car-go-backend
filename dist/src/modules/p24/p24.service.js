import AppError from "../../shared/utils/AppError.js";
import * as p24Repository from "./p24.repository.js";
import { registerTransaction, verifyTransaction, calculateNotificationSign, } from "./p24.client.js";
export const createP24Transaction = async (bookingId) => {
    const booking = await p24Repository.findBookingById(bookingId);
    if (!booking)
        throw new AppError("Reservation not found", 404);
    const amountInGrosz = Math.round(Number(booking.totalPrice) * 100);
    const sessionId = `${booking.id}-${Date.now()}`;
    const { redirectUrl } = await registerTransaction({
        sessionId,
        amount: amountInGrosz,
        description: `Car Rental Booking ${booking.bookingReference || booking.id}`,
        email: booking.customerEmail,
        urlReturn: `${process.env.FRONTEND_URL}/checkout?step=4&id=${booking.id}`,
        urlStatus: `${process.env.BACKEND_URL}/api/p24/webhook`,
    });
    await p24Repository.setP24SessionId(bookingId, sessionId);
    return { url: redirectUrl };
};
export const handleP24Notification = async (payload) => {
    const expectedSign = calculateNotificationSign(payload);
    if (expectedSign !== payload.sign) {
        throw new AppError("Invalid P24 notification signature", 400);
    }
    const booking = await p24Repository.findBookingByP24SessionId(payload.sessionId);
    if (!booking)
        throw new AppError("Booking not found for P24 session", 404);
    const { ok } = await verifyTransaction({
        sessionId: payload.sessionId,
        orderId: payload.orderId,
        amount: payload.amount,
        currency: payload.currency,
    });
    if (!ok)
        throw new AppError("P24 transaction verification failed", 400);
    await p24Repository.markBookingPaid(booking.id, payload.orderId);
    return { received: true };
};
