import { Router } from "express";
import  validate  from "../../../shared/middleware/validate";
import  authMiddleware  from "../../../shared/middleware/authMiddleware";
import {
  createCmsContactSchema,
  updateCmsContactSchema,
  cmsContactParamsSchema,
} from "./cmsContact.validator";
import {
  createCmsContact,
  getAllCmsContacts,
  getCmsContactById,
  getCmsContactByType,
  updateCmsContact,
  deleteCmsContact,
} from "./cmsContact.controller";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  validate(createCmsContactSchema),
  createCmsContact
);

router.get("/", getAllCmsContacts);

router.get(
  "/:id",
  validate(cmsContactParamsSchema, "params"),
  getCmsContactById
);

router.get(
  "/type/:type",
  getCmsContactByType
);

router.put(
  "/:id",
  validate(cmsContactParamsSchema, "params"),
  validate(updateCmsContactSchema),
  updateCmsContact
);

router.delete(
  "/:id",
  validate(cmsContactParamsSchema, "params"),
  deleteCmsContact
);

export default router;