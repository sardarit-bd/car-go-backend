import { Router } from "express";
import * as authController from "./auth.controller";
import validate from "../../shared/middleware/validate";
import authMiddleware from "../../shared/middleware/authMiddleware";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "./auth.validator";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.post("/forgot-password", validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), authController.resetPassword);
router.get("/profile", authMiddleware, authController.getProfile);
router.post("/profile", authMiddleware, validate(updateProfileSchema), authController.updateProfile);

export default router;