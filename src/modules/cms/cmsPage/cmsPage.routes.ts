import { Router } from "express";
import  validate  from "../../../shared/middleware/validate";
import  authMiddleware  from "../../../shared/middleware/authMiddleware";
import {
  createCmsPageSchema,
  updateCmsPageSchema,
  cmsPageParamsSchema,
  cmsPageTypeParamsSchema,
} from "./cmsPage.validator";
import {
  createCmsPage,
  getAllCmsPages,
  getCmsPageById,
  getCmsPageByType,
  updateCmsPage,
  deleteCmsPage,
} from "./cmsPage.controller";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createCmsPageSchema),
  createCmsPage
);

router.get("/", getAllCmsPages);

router.get(
  "/:id",
  validate(cmsPageParamsSchema, "params"),
  getCmsPageById
);

router.get(
  "/type/:type",
  validate(cmsPageTypeParamsSchema, "params"),
  getCmsPageByType
);

router.put(
  "/:id",
  validate(cmsPageParamsSchema, "params"),
  validate(updateCmsPageSchema),
  updateCmsPage
);

router.delete(
  "/:id",
  validate(cmsPageParamsSchema, "params"),
  deleteCmsPage
);

export default router;