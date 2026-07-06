import { Router } from "express";
import validate from "../../shared/middleware/validate.js";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "./package.controller.js";
import {
  packageIdParamsSchema,
  createPackageBodySchema,
  updatePackageBodySchema,
} from "./package.validator.js";

const router = Router();

// Public route
router.get("/", getPackages);

// Admin routes (Auth middleware skipped for now as requested)
// TODO: Add admin auth middleware here before production
router.post(
  "/",
  validate(createPackageBodySchema, "body"),
  createPackage,
);

router.patch(
  "/:id",
  validate(packageIdParamsSchema, "params"),
  validate(updatePackageBodySchema, "body"),
  updatePackage,
);

router.delete(
  "/:id",
  validate(packageIdParamsSchema, "params"),
  deletePackage,
);

export default router;