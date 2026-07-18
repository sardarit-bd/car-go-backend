// backend/src/modules/reservations/reservation.service.ts
import * as reservationRepository from "./reservation.repository";
import AppError from "../../shared/utils/AppError";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const getAllReservations = async (page, limit, filters) => {
  return reservationRepository.findAllReservations(page, limit, filters);
};
export const getReservationById = async (id) => {
  const reservation = await reservationRepository.findReservationById(id);
  if (!reservation) throw new AppError("Reservation not found", 404);
  return reservation;
};
export const getReservationsByPhone = async (phoneNumber) => {
  return reservationRepository.findReservationsByPhoneNumber(phoneNumber);
};
// UPDATED: Replaced `data: any` with `CreateReservationDto`
export const createReservation = async (data) => {
  return reservationRepository.createReservation(data);
};
// UPDATED: Replaced `data: any` with `UpdateReservationDto`
export const updateReservation = async (id, data) => {
  await getReservationById(id);
  return reservationRepository.updateReservation(id, data);
};
export const updateStatus = async (id, status) => {
  await getReservationById(id);
  return reservationRepository.updateReservationStatus(id, status);
};
export const updateQuote = async (id, totalPrice) => {
  await getReservationById(id);
  return reservationRepository.updateReservationQuote(id, totalPrice);
};
export const deleteReservation = async (id) => {
  await getReservationById(id);
  await reservationRepository.softDeleteReservation(id);
};
export const sendPaymentLink = async (id) => {
  const reservation = await getReservationById(id);
  return {
    message: "Payment link sent successfully (Mocked)",
    mockLink: `https://pay.example.com/reservation/${id}`,
  };
};
export const createCheckoutSession = async (bookingId) => {
  const booking = await getReservationById(bookingId);
  const amountInCents = Math.round(Number(booking.totalPrice) * 100);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "blik", "p24"],
    line_items: [
      {
        price_data: {
          currency: "pln",
          product_data: {
            name: `Car Rental: ${booking.vehicle.brand} ${booking.vehicle.model}`,
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/checkout/pay?status=success&id=${booking.id}`,
    cancel_url: `${process.env.FRONTEND_URL}/checkout/pay?status=cancel&id=${booking.id}`,
    metadata: {
      bookingId: booking.id,
    },
  });
  await reservationRepository.updateReservation(bookingId, {
    stripeSessionId: session.id,
  });
  return { url: session.url };
};
export const handleStripeWebhook = async (signature, payload) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error(
      "[Webhook] ERROR: Stripe webhook secret not configured in .env!",
    );
    throw new AppError("Stripe webhook secret not configured", 500);
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("[Webhook] ERROR constructing event:", err.message);
    throw new AppError(`Webhook Error: ${err.message}`, 400);
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;
    if (bookingId) {
      try {
        await reservationRepository.updateReservation(bookingId, {
          paymentStatus: "PAID",
          status: "CONFIRMED",
        });
      } catch (dbError) {}
    } else {
    }
  } else {
  }
  return { received: true };
};
