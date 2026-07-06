import { Router } from "express";
import validate from "../../../shared/middleware/validate.js";
import authMiddleware from "../../../shared/middleware/authMiddleware.js";
import {
  createCmsContactSchema,
  updateCmsContactSchema,
  cmsContactParamsSchema,
} from "./cmsContact.validator.js";
import {
  createCmsContact,
  getAllCmsContacts,
  getCmsContactById,
  getCmsContactByType,
  updateCmsContact,
  deleteCmsContact,
} from "./cmsContact.controller.js";

const router = Router();
router.get("/", getAllCmsContacts);
router.use(authMiddleware);

router.post("/", validate(createCmsContactSchema), createCmsContact);

router.get(
  "/:id",
  validate(cmsContactParamsSchema, "params"),
  getCmsContactById,
);

router.get("/type/:type", getCmsContactByType);

router.put(
  "/:id",
  validate(cmsContactParamsSchema, "params"),
  validate(updateCmsContactSchema),
  updateCmsContact,
);

router.delete(
  "/:id",
  validate(cmsContactParamsSchema, "params"),
  deleteCmsContact,
);

export default router;
