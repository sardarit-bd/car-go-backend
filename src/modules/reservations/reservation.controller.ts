// backend/src/modules/reservations/reservation.controller.ts

import { Request, Response, NextFunction } from "express";
import sendResponse from "../../shared/utils/response";
import * as reservationService from "./reservation.service";
import { CreateReservationDto, UpdateReservationDto } from "./dto/reservation.dto"; // <-- Import DTOs
import { BookingStatus } from "../../../generated/prisma/enums"; // <-- Import Enum for strict typing

export const getReservations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reservationService.getAllReservations();
    sendResponse(res, 200, true, "Reservations fetched successfully", result);
  } catch (error) { next(error); }
};

export const getReservationByPhone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phoneNumber } = req.params;
    const result = await reservationService.getReservationsByPhone(phoneNumber);
    sendResponse(res, 200, true, "Reservations fetched successfully", result);
  } catch (error) { next(error); }
};

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // UPDATED: Cast req.body to CreateReservationDto
    const result = await reservationService.createReservation(req.body as CreateReservationDto);
    sendResponse(res, 201, true, "Reservation created successfully", result);
  } catch (error) { 
    next(error); 
    console.log(error);
  }
};

export const updateReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // UPDATED: Cast req.body to UpdateReservationDto
    const result = await reservationService.updateReservation(req.params.id, req.body as UpdateReservationDto);
    sendResponse(res, 200, true, "Reservation updated successfully", result);
  } catch (error) { next(error); }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // UPDATED: Cast req.body.status to BookingStatus enum for strict type safety
    const result = await reservationService.updateStatus(req.params.id, req.body.status as BookingStatus);
    sendResponse(res, 200, true, "Reservation status updated successfully", result);
  } catch (error) { next(error); }
};

export const updateQuote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reservationService.updateQuote(req.params.id, req.body.totalPrice);
    sendResponse(res, 200, true, "Reservation quote updated successfully", result);
  } catch (error) { next(error); }
};

export const sendPaymentLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await reservationService.sendPaymentLink(req.params.id);
    sendResponse(res, 200, true, "Payment link processed", result);
  } catch (error) { next(error); }
};

export const deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await reservationService.deleteReservation(req.params.id);
    sendResponse(res, 200, true, "Reservation deleted successfully", null);
  } catch (error) { next(error); }
};



export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await reservationService.createCheckoutSession(id);
    sendResponse(res, 200, true, "Checkout session created successfully", result);
  } catch (error) { next(error); }
};

export const handleStripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sig = req.headers['stripe-signature'] as string;
    // req.body is a Buffer here because of the express.raw middleware in app.ts
    const result = await reservationService.handleStripeWebhook(sig, req.body);
    sendResponse(res, 200, true, "Webhook received", result);
  } catch (error) { next(error); }
};