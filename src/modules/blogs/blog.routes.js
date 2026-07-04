import { Router } from "express";
import * as blogController from "./blog.controller";
import authMiddleware from "../../shared/middleware/authMiddleware";
import upload from "../../shared/utils/upload";
// import { validate } from "../../shared/middleware/validate"; // Uncomment if you use a validation middleware
// import { createBlogSchema, updateBlogSchema } from "./blog.validator";
const router = Router();
router.get("/", blogController.getAllBlogs);
router.get("/:slug", blogController.getBlogBySlug);
router.post("/", authMiddleware, upload.single("image"), 
// validate(createBlogSchema), 
blogController.createBlog);
router.patch("/:id", authMiddleware, upload.single("image"), 
// validate(updateBlogSchema), 
blogController.updateBlog);
router.delete("/:id", authMiddleware, blogController.deleteBlog);
export default router;
