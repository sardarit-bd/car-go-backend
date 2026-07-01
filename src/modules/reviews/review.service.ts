import { reviewRepository } from "./review.repository";
import AppError from "../../shared/utils/AppError";

export const reviewService = {
  createReview: async (userId: string, payload: { rating: number; comment: string }) => {
    return reviewRepository.create({
      userId,
      rating: payload.rating,
      comment: payload.comment,
    });
  },

  getApprovedReviews: async (page: number = 1, limit: number = 10) => {
    const reviews = await reviewRepository.findApproved(page, limit);
    const total = await reviewRepository.countApproved();
    return {
      data: reviews,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  },

  getAdminReviews: async (page: number = 1, limit: number = 10, status?: string) => {
    const reviews = await reviewRepository.findAllForAdmin(page, limit, status);
    const total = await reviewRepository.countAllForAdmin(status);
    return {
      data: reviews,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  },

  updateReviewStatus: async (reviewId: string, status: "APPROVED" | "REJECTED") => {
    const review = await reviewRepository.findById(reviewId);
    if (!review) throw new AppError(404, "Review not found or already deleted");
    
    return reviewRepository.updateStatus(reviewId, status);
  },

  deleteReview: async (reviewId: string) => {
    const review = await reviewRepository.findById(reviewId);
    if (!review) throw new AppError(404, "Review not found or already deleted");
    
    return reviewRepository.softDelete(reviewId);
  },
};