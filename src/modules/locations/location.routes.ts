import { Router } from "express";
import validate from "../../shared/middleware/validate";
import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "./location.controller";
import {
  locationIdParamsSchema,
  createLocationBodySchema,
  updateLocationBodySchema,
} from "./location.validator";

const router = Router();

// Public route
router.get("/", getLocations);

// Admin routes (Auth middleware skipped for now as requested)
// TODO: Add admin auth middleware here before production
router.post(
  "/",
  validate(createLocationBodySchema, "body"),
  createLocation,
);

router.patch(
  "/:id",
  validate(locationIdParamsSchema, "params"),
  validate(updateLocationBodySchema, "body"),
  updateLocation,
);

router.delete(
  "/:id",
  validate(locationIdParamsSchema, "params"),
  deleteLocation,
);

export default router;