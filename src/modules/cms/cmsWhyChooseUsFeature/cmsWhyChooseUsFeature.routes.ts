import { Router } from "express";
import  validate  from "../../../shared/middleware/validate";
import  authMiddleware  from "../../../shared/middleware/authMiddleware";
import {
  createCmsWhyChooseUsFeatureSchema,
  updateCmsWhyChooseUsFeatureSchema,
  cmsWhyChooseUsFeatureParamsSchema,
} from "./cmsWhyChooseUsFeature.validator";
import {
  createCmsWhyChooseUsFeature,
  getAllCmsWhyChooseUsFeatures,
  getCmsWhyChooseUsFeatureById,
  updateCmsWhyChooseUsFeature,
  deleteCmsWhyChooseUsFeature,
} from "./cmsWhyChooseUsFeature.controller";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createCmsWhyChooseUsFeatureSchema),
  createCmsWhyChooseUsFeature
);

router.get("/", getAllCmsWhyChooseUsFeatures);

router.get(
  "/:id",
  validate(cmsWhyChooseUsFeatureParamsSchema, "params"),
  getCmsWhyChooseUsFeatureById
);

router.put(
  "/:id",
  validate(cmsWhyChooseUsFeatureParamsSchema, "params"),
  validate(updateCmsWhyChooseUsFeatureSchema),
  updateCmsWhyChooseUsFeature
);

router.delete(
  "/:id",
  validate(cmsWhyChooseUsFeatureParamsSchema, "params"),
  deleteCmsWhyChooseUsFeature
);

export default router;