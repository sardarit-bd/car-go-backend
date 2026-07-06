import { Router } from "express";
import validate from "../../../shared/middleware/validate.js";
import authMiddleware from "../../../shared/middleware/authMiddleware.js";
import {
  createCmsHeroFeatureSchema,
  updateCmsHeroFeatureSchema,
  cmsHeroFeatureParamsSchema,
} from "./cmsHeroFeature.validator.js";
import {
  createCmsHeroFeature,
  getAllCmsHeroFeatures,
  getCmsHeroFeatureById,
  updateCmsHeroFeature,
  deleteCmsHeroFeature,
} from "./cmsHeroFeature.controller.js";

const router = Router();
router.get("/", getAllCmsHeroFeatures);
router.use(authMiddleware);

router.post("/", validate(createCmsHeroFeatureSchema), createCmsHeroFeature);

router.get(
  "/:id",
  validate(cmsHeroFeatureParamsSchema, "params"),
  getCmsHeroFeatureById,
);

router.put(
  "/:id",
  validate(cmsHeroFeatureParamsSchema, "params"),
  validate(updateCmsHeroFeatureSchema),
  updateCmsHeroFeature,
);

router.delete(
  "/:id",
  validate(cmsHeroFeatureParamsSchema, "params"),
  deleteCmsHeroFeature,
);

export default router;
