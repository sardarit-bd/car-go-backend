import { Router } from "express";
import validate from "../../shared/middleware/validate";
import * as controller from "./reservation.controller";
import * as validator from "./reservation.validator";

const router = Router();

// Public / General Routes
router.get("/", controller.getReservations);
router.get("/check/:phoneNumber", validate(validator.phoneNumberParamsSchema, "params"), controller.getReservationByPhone);

// Admin / CRUD Routes (Auth skipped for now)
// TODO: Add admin auth middleware here before production
router.post("/", validate(validator.createReservationBodySchema, "body"), controller.createReservation);
router.patch("/:id", validate(validator.reservationIdParamsSchema, "params"), validate(validator.updateReservationBodySchema, "body"), controller.updateReservation);
router.delete("/:id", validate(validator.reservationIdParamsSchema, "params"), controller.deleteReservation);

// Specific Action Routes
router.patch("/:id/status", validate(validator.reservationIdParamsSchema, "params"), validate(validator.updateStatusBodySchema, "body"), controller.updateStatus);
router.patch("/:id/quote", validate(validator.reservationIdParamsSchema, "params"), validate(validator.updateQuoteBodySchema, "body"), controller.updateQuote);
router.post("/:id/send-payment-link", validate(validator.reservationIdParamsSchema, "params"), controller.sendPaymentLink);

export default router;