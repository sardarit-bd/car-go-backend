// backend/src/modules/reservations/reservation.controller.ts
import sendResponse from "../../shared/utils/response.js";
import * as reservationService from "./reservation.service.js";
export const getReservations = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const filters = {
            status: req.query.status,
            pickupDateFrom: req.query.pickupDateFrom,
            pickupDateTo: req.query.pickupDateTo,
            returnDateFrom: req.query.returnDateFrom,
            returnDateTo: req.query.returnDateTo,
            phoneNumber: req.query.phoneNumber,
            customerEmail: req.query.customerEmail,
        };
        const result = await reservationService.getAllReservations(page, limit, filters);
        sendResponse(res, 200, true, "Reservations fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const getReservationByEmail = async (req, res, next) => {
    try {
        console.log("hit");
        // const { email } = req?.user;
        // console.log("email", email);
        // const result = await reservationService.getReservationsByEmail(
        //   email as string,
        // );
        // console.log("result", result);
        // sendResponse(res, 200, true, "Reservations fetched successfully", result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const createReservation = async (req, res, next) => {
    try {
        const result = await reservationService.createReservation(req.body);
        sendResponse(res, 201, true, "Reservation created successfully", result);
    }
    catch (error) {
        next(error);
        console.log(error);
    }
};
export const updateReservation = async (req, res, next) => {
    try {
        // UPDATED: Cast req.body to UpdateReservationDto
        const result = await reservationService.updateReservation(req.params.id, req.body);
        sendResponse(res, 200, true, "Reservation updated successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const updateStatus = async (req, res, next) => {
    try {
        // UPDATED: Cast req.body.status to BookingStatus enum for strict type safety
        const result = await reservationService.updateStatus(req.params.id, req.body.status);
        sendResponse(res, 200, true, "Reservation status updated successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const updateQuote = async (req, res, next) => {
    try {
        const result = await reservationService.updateQuote(req.params.id, req.body.totalPrice);
        sendResponse(res, 200, true, "Reservation quote updated successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const sendPaymentLink = async (req, res, next) => {
    try {
        const result = await reservationService.sendPaymentLink(req.params.id);
        sendResponse(res, 200, true, "Payment link processed", result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteReservation = async (req, res, next) => {
    try {
        await reservationService.deleteReservation(req.params.id);
        sendResponse(res, 200, true, "Reservation deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
export const createCheckoutSession = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await reservationService.createCheckoutSession(id);
        sendResponse(res, 200, true, "Checkout session created successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const handleStripeWebhook = async (req, res, next) => {
    try {
        const sig = req.headers["stripe-signature"];
        // req.body is a Buffer here because of the express.raw middleware in app.ts
        const result = await reservationService.handleStripeWebhook(sig, req.body);
        sendResponse(res, 200, true, "Webhook received", result);
    }
    catch (error) {
        next(error);
    }
};
export const getReservationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await reservationService.getReservationById(id);
        sendResponse(res, 200, true, "Reservation fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
};
