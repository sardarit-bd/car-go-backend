import * as yup from "yup";
export const createReviewSchema = yup.object().shape({
    rating: yup
        .number()
        .required("Rating is required")
        .integer("Rating must be an integer")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating must be at most 5"),
    comment: yup
        .string()
        .required("Comment is required")
        .min(1, "Comment cannot be empty")
        .max(1000, "Comment is too long"),
});
export const updateReviewStatusSchema = yup.object().shape({
    status: yup
        .string()
        .oneOf(["APPROVED", "REJECTED"], "Status must be either APPROVED or REJECTED")
        .required("Status is required"),
});
