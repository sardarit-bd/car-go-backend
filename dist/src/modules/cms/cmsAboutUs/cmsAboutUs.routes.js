import { Router } from "express";
import { validateAboutUs } from "./cmsAboutUs.validator.js";
import authMiddleware from "../../../shared/middleware/authMiddleware.js";
import { getCmsAboutUsController, createOrUpdateCmsAboutUsController, deleteCmsAboutUsController, uploadImageController, uploadMiddleware, // Import the multer middleware
 } from "./cmsAboutUs.controller.js";
const router = Router();
router.get("/", getCmsAboutUsController);
router.post("/", authMiddleware, validateAboutUs, createOrUpdateCmsAboutUsController);
router.delete("/:id", authMiddleware, deleteCmsAboutUsController);
router.post("/upload", authMiddleware, uploadMiddleware, uploadImageController);
export default router;
