import * as yup from "yup";

export const createCmsWhyChooseUsSchema = yup.object({
  subtitle: yup.string().optional(),
  title: yup.string().required("Title is required"),
  mainImage: yup.string().optional(),
});

export const updateCmsWhyChooseUsSchema = yup.object({
  subtitle: yup.string().optional(),
  title: yup.string().optional(),
  mainImage: yup.string().optional(),
});

export const cmsWhyChooseUsParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});

export type CreateCmsWhyChooseUsBody = yup.InferType<typeof createCmsWhyChooseUsSchema>;
export type UpdateCmsWhyChooseUsBody = yup.InferType<typeof updateCmsWhyChooseUsSchema>;