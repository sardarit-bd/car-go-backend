import { Router } from "express";
import validate from "../../../shared/middleware/validate.js";
import authMiddleware from "../../../shared/middleware/authMiddleware.js";
import upload from "../../../shared/utils/upload.js";
import {
  createCmsWhyChooseUsSchema,
  updateCmsWhyChooseUsSchema,
  cmsWhyChooseUsParamsSchema,
} from "./cmsWhyChooseUs.validator.js";
import {
  createCmsWhyChooseUs,
  getCmsWhyChooseUs,
  getCmsWhyChooseUsById,
  updateCmsWhyChooseUs,
  deleteCmsWhyChooseUs,
} from "./cmsWhyChooseUs.controller.js";

const router = Router();
router.get("/", getCmsWhyChooseUs);
router.use(authMiddleware);
router.post(
  "/",
  upload.single("mainImage"),
  validate(createCmsWhyChooseUsSchema),
  createCmsWhyChooseUs,
);
router.get(
  "/:id",
  validate(cmsWhyChooseUsParamsSchema, "params"),
  getCmsWhyChooseUsById,
);
router.put(
  "/:id",
  validate(cmsWhyChooseUsParamsSchema, "params"),
  upload.single("mainImage"),
  validate(updateCmsWhyChooseUsSchema),
  updateCmsWhyChooseUs,
);
router.delete(
  "/:id",
  validate(cmsWhyChooseUsParamsSchema, "params"),
  deleteCmsWhyChooseUs,
);

export default router;
