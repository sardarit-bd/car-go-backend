// backend/src/modules/reservations/reservation.service.ts

import * as reservationRepository from "./reservation.repository.js";
import * as vehicleRepository from "../vehicle/vehicle.repository.js";
import AppError from "../../shared/utils/AppError.js";
import { BookingStatus } from "../../../generated/prisma/enums.js";
import {
  CreateReservationDto,
  UpdateReservationDto,
} from "./dto/reservation.dto.js";
import Stripe from "stripe";
import { triggerGuestAccountActivation } from "../../shared/utils/accountActivation.js";

export const getAllReservations = async (
  page: number,
  limit: number,
  filters?: {
    status?: "PENDING" | "CONFIRMED" | "CANCELLED";
    pickupDateFrom?: string;
    pickupDateTo?: string;
    returnDateFrom?: string;
    returnDateTo?: string;
    phoneNumber?: string;
    customerEmail?: string;
  },
) => {
  return reservationRepository.findAllReservations(page, limit, filters);
};

export const getReservationById = async (id: string) => {
  const reservation = await reservationRepository.findReservationById(id);
  if (!reservation) throw new AppError("Reservation not found", 404);
  return reservation;
};

export const getReservationsByEmail = async (email: string) => {
  return reservationRepository.findReservationsByEmail(email);
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createReservation = async (data: CreateReservationDto) => {
  const pickupDate = new Date(data.pickupDate);
  const returnDate = new Date(data.returnDate);
  const diffTime = returnDate.getTime() - pickupDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

  console.log("Backend Date Validation:", {
    pickupDate: data.pickupDate,
    returnDate: data.returnDate,
    calculatedDays: diffDays,
  });

  if (diffDays < 3) {
    throw new AppError(
      `Minimalny okres wynajmu to 3 dni. Wybrany okres to tylko ${diffDays} dni.`,
      400,
    );
  }

  const blockedOverlaps =
    await vehicleRepository.findOverlappingBlockedAvailability(
      data.vehicleId,
      pickupDate,
      returnDate,
    );

  if (blockedOverlaps.length > 0) {
    const latestBlockedEnd = blockedOverlaps.reduce(
      (latest, b) => (b.availableTo > latest ? b.availableTo : latest),
      blockedOverlaps[0].availableTo,
    );
    const earliestAvailable = new Date(latestBlockedEnd);
    earliestAvailable.setDate(earliestAvailable.getDate() + 1);
    const earliestAvailableStr = earliestAvailable.toISOString().split("T")[0];

    throw new AppError(
      `Ten pojazd jest niedostępny w wybranym terminie. Najwcześniejszy dostępny termin to ${earliestAvailableStr}.`,
      400,
    );
  }

  const reservation = await reservationRepository.createReservation(data);

  if (reservation.status === "CONFIRMED" || reservation.status === "PENDING") {
    try {
      const activationResult = await triggerGuestAccountActivation({
        email: data.customerEmail,
        firstName: data.customerFirstName,
        lastName: data.customerLastName,
        phone: data.phoneNumber,
      });

      return {
        ...reservation,
        activationLink: activationResult.activationLink,
        emailSent: activationResult.emailSent,
      };
    } catch (activationError) {
      return reservation;
    }
  }

  return reservation;
};

export const updateReservation = async (
  id: string,
  data: UpdateReservationDto,
) => {
  await getReservationById(id);
  return reservationRepository.updateReservation(id, data);
};

export const updateStatus = async (id: string, status: BookingStatus) => {
  await getReservationById(id);
  return reservationRepository.updateReservationStatus(id, status);
};

export const updateQuote = async (id: string, totalPrice: number) => {
  await getReservationById(id);
  return reservationRepository.updateReservationQuote(id, totalPrice);
};

export const deleteReservation = async (id: string) => {
  await getReservationById(id);
  await reservationRepository.softDeleteReservation(id);
};

export const sendPaymentLink = async (id: string) => {
  const reservation = await getReservationById(id);

  return {
    message: "Payment link sent successfully (Mocked)",
    mockLink: `https://pay.example.com/reservation/${id}`,
  };
};

export const createCheckoutSession = async (bookingId: string) => {
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

export const handleStripeWebhook = async (
  signature: string,
  payload: Buffer,
) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error(
      "[Webhook] ERROR: Stripe webhook secret not configured in .env!",
    );
    throw new AppError("Stripe webhook secret not configured", 500);
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error("[Webhook] ERROR constructing event:", err.message);
    throw new AppError(`Webhook Error: ${err.message}`, 400);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      try {
        await reservationRepository.updateReservation(bookingId, {
          paymentStatus: "PAID",
          status: "CONFIRMED",
        });
      } catch (dbError: any) {}
    } else {
    }
  } else {
  }

  return { received: true };
};
