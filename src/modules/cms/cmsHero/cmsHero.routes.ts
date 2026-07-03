import { Router } from "express";
import  validate  from "../../../shared/middleware/validate";
import  authMiddleware  from "../../../shared/middleware/authMiddleware";
import {
  createCmsHeroSchema,
  updateCmsHeroSchema,
  cmsHeroParamsSchema,
} from "./cmsHero.validator";
import {
  createCmsHero,
  getCmsHero,
  getCmsHeroById,
  updateCmsHero,
  deleteCmsHero,
} from "./cmsHero.controller";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createCmsHeroSchema),
  createCmsHero
);

router.get("/", getCmsHero);

router.get(
  "/:id",
  validate(cmsHeroParamsSchema, "params"),
  getCmsHeroById
);

router.put(
  "/:id",
  validate(cmsHeroParamsSchema, "params"),
  validate(updateCmsHeroSchema),
  updateCmsHero
);

router.delete(
  "/:id",
  validate(cmsHeroParamsSchema, "params"),
  deleteCmsHero
);

export default router;