import { Router } from "express";
import validate from "../../shared/middleware/validate.js";
import {
  getAddons,
  createAddon,
  updateAddon,
  deleteAddon,
} from "./addon.controller.js";
import {
  addonIdParamsSchema,
  createAddonBodySchema,
  updateAddonBodySchema,
} from "./addon.validator.js";

const router = Router();

// Public route
router.get("/", getAddons);

// Admin routes (Auth middleware skipped for now as requested)
// TODO: Add admin auth middleware here before production
router.post(
  "/",
  validate(createAddonBodySchema, "body"),
  createAddon,
);

router.patch(
  "/:id",
  validate(addonIdParamsSchema, "params"),
  validate(updateAddonBodySchema, "body"),
  updateAddon,
);

router.delete(
  "/:id",
  validate(addonIdParamsSchema, "params"),
  deleteAddon,
);

export default router;