// backend/src/modules/reservations/reservation.service.ts

import * as reservationRepository from "./reservation.repository";
import AppError from "../../shared/utils/AppError";
import { BookingStatus } from "../../../generated/prisma/enums";
import { CreateReservationDto, UpdateReservationDto } from "./dto/reservation.dto"; // <-- Import DTOs
import Stripe from 'stripe'; 


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);


export const getAllReservations = async () => {
  return reservationRepository.findAllReservations();
};

export const getReservationById = async (id: string) => {
  const reservation = await reservationRepository.findReservationById(id);
  if (!reservation) throw new AppError("Reservation not found", 404);
  return reservation;
};

export const getReservationsByPhone = async (phoneNumber: string) => {
  return reservationRepository.findReservationsByPhoneNumber(phoneNumber);
};

// UPDATED: Replaced `data: any` with `CreateReservationDto`
export const createReservation = async (data: CreateReservationDto) => {
  return reservationRepository.createReservation(data);
};

// UPDATED: Replaced `data: any` with `UpdateReservationDto`
export const updateReservation = async (id: string, data: UpdateReservationDto) => {
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
  
  console.log(`[Mock Payment Gateway] Sending payment link for $${reservation.totalPrice} to phone: ${reservation.phoneNumber}`);
  
  return {
    message: "Payment link sent successfully (Mocked)",
    mockLink: `https://pay.example.com/reservation/${id}`
  };
};



export const createCheckoutSession = async (bookingId: string) => {
  const booking = await getReservationById(bookingId);
  
  // Stripe requires amounts in the smallest currency unit (e.g., groszy for PLN). 
  const amountInCents = Math.round(Number(booking.totalPrice) * 100);

  // Now 'stripe' is correctly defined at the top level!
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'blik', 'p24'], 
    line_items: [
      {
        price_data: {
          currency: 'pln',
          product_data: {
            name: `Car Rental: ${booking.vehicle.brand} ${booking.vehicle.model}`,
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
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

export const handleStripeWebhook = async (signature: string, payload: Buffer) => {
  console.log('\n=== STRIPE WEBHOOK RECEIVED ==='); // <-- Added log
  
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[Webhook] ERROR: Stripe webhook secret not configured in .env!');
    throw new AppError("Stripe webhook secret not configured", 500);
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    console.log('[Webhook] Event type received:', event.type); // <-- Added log
  } catch (err: any) {
    console.error('[Webhook] ERROR constructing event:', err.message);
    throw new AppError(`Webhook Error: ${err.message}`, 400);
  }

  if (event.type === 'checkout.session.completed') {
    console.log('[Webhook] Processing checkout.session.completed...');
    
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('[Webhook] Session metadata:', session.metadata); // <-- Added log to see what Stripe sent
    
    const bookingId = session.metadata?.bookingId;
    console.log('[Webhook] Extracted bookingId:', bookingId); // <-- Added log

    if (bookingId) {
      console.log(`[Webhook] Attempting to update booking ${bookingId} in database...`);
      try {
        await reservationRepository.updateReservation(bookingId, {
          paymentStatus: 'PAID',
          status: 'CONFIRMED', 
        });
        console.log('[Webhook] SUCCESS: Booking updated in database!'); // <-- Added log
      } catch (dbError: any) {
        console.error('[Webhook] ERROR updating database:', dbError.message); // <-- Added log
      }
    } else {
      console.error('[Webhook] ERROR: No bookingId found in session metadata!'); // <-- Added log
    }
  } else {
    console.log(`[Webhook] Ignoring event type: ${event.type}`); // <-- Added log
  }

  return { received: true };
};




