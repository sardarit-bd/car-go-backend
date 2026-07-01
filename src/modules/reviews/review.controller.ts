import { Request, Response, NextFunction } from "express";
import { reviewService } from "./review.service";

export const reviewController = {
  createReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Assuming your authMiddleware attaches the user object to req.user
      const userId = (req as any).user.id; 
      const result = await reviewService.createReview(userId, req.body);
      res.status(201).json({ 
        success: true, 
        message: "Review submitted successfully and is pending approval", 
        data: result 
      });
    } catch (error) {
      next(error);
    }
  },

  getApprovedReviews: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const result = await reviewService.getApprovedReviews(page, limit);
      res.status(200).json({ 
        success: true, 
        message: "Approved reviews fetched successfully", 
        ...result 
      });
    } catch (error) {
      next(error);
    }
  },

  getAdminReviews: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const status = req.query.status as string | undefined;
      const result = await reviewService.getAdminReviews(page, limit, status);
      res.status(200).json({ 
        success: true, 
        message: "All reviews fetched successfully", 
        ...result 
      });
    } catch (error) {
      next(error);
    }
  },

  updateReviewStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const result = await reviewService.updateReviewStatus(id, status);
      res.status(200).json({ 
        success: true, 
        message: `Review ${status.toLowerCase()} successfully`, 
        data: result 
      });
    } catch (error) {
      next(error);
    }
  },

  deleteReview: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await reviewService.deleteReview(id);
      res.status(200).json({ 
        success: true, 
        message: "Review deleted successfully" 
      });
    } catch (error) {
      next(error);
    }
  },
};