import { Router } from "express";
import validate from "../../shared/middleware/validate.js";
import * as controller from "./reservation.controller.js";
import * as validator from "./reservation.validator.js";
import authMiddleware from "../../shared/middleware/authMiddleware.js";
const router = Router();

router.get("/my-reservations", controller.getReservationByEmail);

router.get(
  "/:id",
  validate(validator.revertionIdParamsSchema, "params"),
  controller.getReservationById,
);

router.post(
  "/",
  validate(validator.createReservationBodySchema, "body"),
  controller.createReservation,
);
router.post(
  "/:id/send-payment-link",
  validate(validator.reservationIdParamsSchema, "params"),
  controller.sendPaymentLink,
);
router.post(
  "/:id/checkout-session",
  validate(validator.reservationIdParamsSchema, "params"),
  controller.createCheckoutSession,
);
router.post("/webhook", controller.handleStripeWebhook);
router.use(authMiddleware);
router.get("/", controller.getReservations);

router.patch(
  "/:id",
  validate(validator.reservationIdParamsSchema, "params"),
  validate(validator.updateReservationBodySchema, "body"),
  controller.updateReservation,
);
router.delete(
  "/:id",
  validate(validator.reservationIdParamsSchema, "params"),
  controller.deleteReservation,
);

router.patch(
  "/:id/status",
  validate(validator.reservationIdParamsSchema, "params"),
  validate(validator.updateStatusBodySchema, "body"),
  controller.updateStatus,
);
router.patch(
  "/:id/quote",
  validate(validator.reservationIdParamsSchema, "params"),
  validate(validator.updateQuoteBodySchema, "body"),
  controller.updateQuote,
);

export default router;
