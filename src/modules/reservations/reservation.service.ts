import * as reservationRepository from "./reservation.repository";
import AppError from "../../shared/utils/AppError";
import { BookingStatus } from "../../../generated/prisma/enums";

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

export const createReservation = async (data: any) => {

  return reservationRepository.createReservation(data);
};

export const updateReservation = async (id: string, data: any) => {
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