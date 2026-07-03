import * as yup from "yup";

export const createCmsHeroFeatureSchema = yup.object({
  text: yup.string().required("Text is required"),
  order: yup.number().integer().min(0).max(3).required("Order is required (0-3)"),
  isActive: yup.boolean().optional(),
});

export const updateCmsHeroFeatureSchema = yup.object({
  text: yup.string().optional(),
  order: yup.number().integer().min(0).max(3).optional(),
  isActive: yup.boolean().optional(),
});

export const cmsHeroFeatureParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});

export type CreateCmsHeroFeatureBody = yup.InferType<typeof createCmsHeroFeatureSchema>;
export type UpdateCmsHeroFeatureBody = yup.InferType<typeof updateCmsHeroFeatureSchema>;