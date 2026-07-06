import express from "express";
import { reviewController } from "./review.controller.js";
import validate  from "../../shared/middleware/validate.js";
import { createReviewSchema, updateReviewStatusSchema } from "./review.validator.js";
import authMiddleware from "../../shared/middleware/authMiddleware.js";

const router = express.Router();

// Public route: Get approved reviews
router.get("/", reviewController.getApprovedReviews);

// User route: Submit a review (Requires login)
router.post(
  "/",
  authMiddleware, 
  validate(createReviewSchema), 
  reviewController.createReview
);

// Admin routes: Manage reviews (Requires Admin role)
// IMPORTANT: Ensure your authMiddleware checks for the ADMIN role here, 
// or wrap these routes in a roleMiddleware if you have one.
router.get(
  "/admin",
  authMiddleware, 
  reviewController.getAdminReviews
);

router.patch(
  "/:id/status",
  authMiddleware,
  validate(updateReviewStatusSchema),
  reviewController.updateReviewStatus
);

router.delete(
  "/:id",
  authMiddleware,
  reviewController.deleteReview
);

export default router;