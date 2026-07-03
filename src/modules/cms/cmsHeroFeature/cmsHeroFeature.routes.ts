import { Router } from "express";
import  validate  from "../../../shared/middleware/validate";
import  authMiddleware  from "../../../shared/middleware/authMiddleware";
import {
  createCmsHeroFeatureSchema,
  updateCmsHeroFeatureSchema,
  cmsHeroFeatureParamsSchema,
} from "./cmsHeroFeature.validator";
import {
  createCmsHeroFeature,
  getAllCmsHeroFeatures,
  getCmsHeroFeatureById,
  updateCmsHeroFeature,
  deleteCmsHeroFeature,
} from "./cmsHeroFeature.controller";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createCmsHeroFeatureSchema),
  createCmsHeroFeature
);

router.get("/", getAllCmsHeroFeatures);

router.get(
  "/:id",
  validate(cmsHeroFeatureParamsSchema, "params"),
  getCmsHeroFeatureById
);

router.put(
  "/:id",
  validate(cmsHeroFeatureParamsSchema, "params"),
  validate(updateCmsHeroFeatureSchema),
  updateCmsHeroFeature
);

router.delete(
  "/:id",
  validate(cmsHeroFeatureParamsSchema, "params"),
  deleteCmsHeroFeature
);

export default router;