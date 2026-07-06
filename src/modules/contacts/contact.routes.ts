import { Router } from "express";
import * as contactController from "./contact.controller.js";
import authMiddleware from "../../shared/middleware/authMiddleware.js";
import  validate  from "../../shared/middleware/validate.js"; 
import { createContactSchema, updateContactStatusSchema } from "./contact.validator.js";

const router = Router();


router.post(
  "/",
  validate(createContactSchema),
  contactController.createContact
);


router.get(
  "/",
  authMiddleware,
  contactController.getAllContacts
);

router.patch(
  "/:id/status",
  authMiddleware,
  validate(updateContactStatusSchema),
  contactController.updateContactStatus
);

export default router;