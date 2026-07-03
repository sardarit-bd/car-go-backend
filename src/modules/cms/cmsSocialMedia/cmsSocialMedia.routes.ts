import { Router } from "express";
import  validate  from "../../../shared/middleware/validate";
import  authMiddleware  from "../../../shared/middleware/authMiddleware";
import {
  createCmsSocialMediaSchema,
  updateCmsSocialMediaSchema,
  cmsSocialMediaParamsSchema,
} from "./cmsSocialMedia.validator";
import {
  createCmsSocialMedia,
  getAllCmsSocialMedia,
  getCmsSocialMediaById,
  updateCmsSocialMedia,
  deleteCmsSocialMedia,
} from "./cmsSocialMedia.controller";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createCmsSocialMediaSchema),
  createCmsSocialMedia
);

router.get("/", getAllCmsSocialMedia);

router.get(
  "/:id",
  validate(cmsSocialMediaParamsSchema, "params"),
  getCmsSocialMediaById
);

router.put(
  "/:id",
  validate(cmsSocialMediaParamsSchema, "params"),
  validate(updateCmsSocialMediaSchema),
  updateCmsSocialMedia
);

router.delete(
  "/:id",
  validate(cmsSocialMediaParamsSchema, "params"),
  deleteCmsSocialMedia
);

export default router;