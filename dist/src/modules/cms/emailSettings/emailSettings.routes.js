import { Router } from "express";
import { getEmailSettings, updateEmailSettings } from "./emailSettings.controller.js";
const router = Router();
// GET /api/cms/email-settings
router.get("/", getEmailSettings);
// PUT /api/cms/email-settings
router.put("/", updateEmailSettings);
export default router;
