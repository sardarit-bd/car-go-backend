import { reviewRepository } from "./review.repository.js";
import AppError from "../../shared/utils/AppError.js";
export const reviewService = {
    createReview: async (userId, payload) => {
        return reviewRepository.create({
            userId,
            rating: payload.rating,
            comment: payload.comment,
        });
    },
    getApprovedReviews: async (page = 1, limit = 10) => {
        const reviews = await reviewRepository.findApproved(page, limit);
        const total = await reviewRepository.countApproved();
        return {
            data: reviews,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    },
    getAdminReviews: async (page = 1, limit = 10, status) => {
        const reviews = await reviewRepository.findAllForAdmin(page, limit, status);
        const total = await reviewRepository.countAllForAdmin(status);
        return {
            data: reviews,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    },
    updateReviewStatus: async (reviewId, status) => {
        const review = await reviewRepository.findById(reviewId);
        if (!review)
            throw new AppError("Review not found or already deleted", 404);
        return reviewRepository.updateStatus(reviewId, status);
    },
    deleteReview: async (reviewId) => {
        const review = await reviewRepository.findById(reviewId);
        if (!review)
            throw new AppError("Review not found or already deleted", 404);
        return reviewRepository.softDelete(reviewId);
    },
};
