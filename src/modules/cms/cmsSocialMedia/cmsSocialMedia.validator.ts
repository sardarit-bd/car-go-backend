import * as yup from "yup";

export const createCmsSocialMediaSchema = yup.object({
  platform: yup
    .string()
    .oneOf(["Facebook", "Instagram", "Twitter", "LinkedIn"], "Invalid platform")
    .required("Platform is required"),
  url: yup.string().url("Invalid URL format").required("URL is required"),
  isActive: yup.boolean().optional(),
  order: yup.number().integer().min(0).optional(),
});

export const updateCmsSocialMediaSchema = yup.object({
  url: yup.string().url("Invalid URL format").optional(),
  isActive: yup.boolean().optional(),
  order: yup.number().integer().min(0).optional(),
});

export const cmsSocialMediaParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});

export type CreateCmsSocialMediaBody = yup.InferType<typeof createCmsSocialMediaSchema>;
export type UpdateCmsSocialMediaBody = yup.InferType<typeof updateCmsSocialMediaSchema>;