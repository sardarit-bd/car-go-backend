import { Router } from "express";
import  validate  from "../../../shared/middleware/validate";
import  authMiddleware  from "../../../shared/middleware/authMiddleware";
import {
  createCmsWhyChooseUsSchema,
  updateCmsWhyChooseUsSchema,
  cmsWhyChooseUsParamsSchema,
} from "./cmsWhyChooseUs.validator";
import {
  createCmsWhyChooseUs,
  getCmsWhyChooseUs,
  getCmsWhyChooseUsById,
  updateCmsWhyChooseUs,
  deleteCmsWhyChooseUs,
} from "./cmsWhyChooseUs.controller";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createCmsWhyChooseUsSchema),
  createCmsWhyChooseUs
);

router.get("/", getCmsWhyChooseUs);

router.get(
  "/:id",
  validate(cmsWhyChooseUsParamsSchema, "params"),
  getCmsWhyChooseUsById
);

router.put(
  "/:id",
  validate(cmsWhyChooseUsParamsSchema, "params"),
  validate(updateCmsWhyChooseUsSchema),
  updateCmsWhyChooseUs
);

router.delete(
  "/:id",
  validate(cmsWhyChooseUsParamsSchema, "params"),
  deleteCmsWhyChooseUs
);

export default router;