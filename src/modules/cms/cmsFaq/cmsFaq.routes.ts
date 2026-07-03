import { Router } from "express";
import  validate  from "../../../shared/middleware/validate";
import  authMiddleware  from "../../../shared/middleware/authMiddleware";
import {
  createCmsFaqSchema,
  updateCmsFaqSchema,
  cmsFaqParamsSchema,
} from "./cmsFaq.validator";
import {
  createCmsFaq,
  getAllCmsFaqs,
  getCmsFaqById,
  updateCmsFaq,
  deleteCmsFaq,
} from "./cmsFaq.controller";

const router = Router();

// All routes are protected
router.use(authMiddleware);

router.post(
  "/",
  validate(createCmsFaqSchema),
  createCmsFaq
);

router.get("/", getAllCmsFaqs);

router.get(
  "/:id",
  validate(cmsFaqParamsSchema, "params"),
  getCmsFaqById
);

router.put(
  "/:id",
  validate(cmsFaqParamsSchema, "params"),
  validate(updateCmsFaqSchema),
  updateCmsFaq
);

router.delete(
  "/:id",
  validate(cmsFaqParamsSchema, "params"),
  deleteCmsFaq
);

export default router;