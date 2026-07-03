import * as yup from "yup";

export const createCmsFaqSchema = yup.object({
  question: yup.string().required("Question is required"),
  answer: yup.string().required("Answer is required"),
  order: yup.number().integer().min(0).optional(),
  isActive: yup.boolean().optional(),
});

export const updateCmsFaqSchema = yup.object({
  question: yup.string().optional(),
  answer: yup.string().optional(),
  order: yup.number().integer().min(0).optional(),
  isActive: yup.boolean().optional(),
});

export const cmsFaqParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});

export type CreateCmsFaqBody = yup.InferType<typeof createCmsFaqSchema>;
export type UpdateCmsFaqBody = yup.InferType<typeof updateCmsFaqSchema>;