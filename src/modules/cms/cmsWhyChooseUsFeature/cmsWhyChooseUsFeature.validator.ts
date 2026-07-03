import * as yup from "yup";

export const createCmsWhyChooseUsFeatureSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  order: yup.number().integer().min(0).max(3).required("Order is required (0-3)"),
  isActive: yup.boolean().optional(),
});

export const updateCmsWhyChooseUsFeatureSchema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  order: yup.number().integer().min(0).max(3).optional(),
  isActive: yup.boolean().optional(),
});

export const cmsWhyChooseUsFeatureParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});

export type CreateCmsWhyChooseUsFeatureBody = yup.InferType<typeof createCmsWhyChooseUsFeatureSchema>;
export type UpdateCmsWhyChooseUsFeatureBody = yup.InferType<typeof updateCmsWhyChooseUsFeatureSchema>;