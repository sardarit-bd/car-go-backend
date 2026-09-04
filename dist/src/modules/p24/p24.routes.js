import { Router } from "express";
import * as controller from "./p24.controller.js";
const router = Router();
router.post("/checkout-session/:id", controller.createTransaction);
router.post("/webhook", controller.webhook);
export default router;
