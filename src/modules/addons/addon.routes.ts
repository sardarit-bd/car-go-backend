import { Router } from "express";
import validate from "../../shared/middleware/validate";
import {
  getAddons,
  createAddon,
  updateAddon,
  deleteAddon,
} from "./addon.controller";
import {
  addonIdParamsSchema,
  createAddonBodySchema,
  updateAddonBodySchema,
} from "./addon.validator";

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