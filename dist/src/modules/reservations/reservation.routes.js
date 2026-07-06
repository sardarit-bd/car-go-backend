import { Router } from "express";
import validate from "../../shared/middleware/validate.js";
import * as controller from "./reservation.controller.js";
import * as validator from "./reservation.validator.js";
const router = Router();
router.get("/", 
//   validate(validator.getReservationsQuerySchema, "query"), 
controller.getReservations);
router.get("/check/:phoneNumber", validate(validator.phoneNumberParamsSchema, "params"), controller.getReservationByPhone);
router.post("/", validate(validator.createReservationBodySchema, "body"), controller.createReservation);
router.patch("/:id", validate(validator.reservationIdParamsSchema, "params"), validate(validator.updateReservationBodySchema, "body"), controller.updateReservation);
router.delete("/:id", validate(validator.reservationIdParamsSchema, "params"), controller.deleteReservation);
router.patch("/:id/status", validate(validator.reservationIdParamsSchema, "params"), validate(validator.updateStatusBodySchema, "body"), controller.updateStatus);
router.patch("/:id/quote", validate(validator.reservationIdParamsSchema, "params"), validate(validator.updateQuoteBodySchema, "body"), controller.updateQuote);
router.post("/:id/send-payment-link", validate(validator.reservationIdParamsSchema, "params"), controller.sendPaymentLink);
router.post("/:id/checkout-session", validate(validator.reservationIdParamsSchema, "params"), controller.createCheckoutSession);
router.post("/webhook", controller.handleStripeWebhook);
export default router;
