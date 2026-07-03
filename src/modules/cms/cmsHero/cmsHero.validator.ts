import * as yup from "yup";

export const createCmsHeroSchema = yup.object({
  tagline: yup.string().optional(),
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
});

export const updateCmsHeroSchema = yup.object({
  tagline: yup.string().optional(),
  title: yup.string().optional(),
  subtitle: yup.string().optional(),
});

export const cmsHeroParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});

export type CreateCmsHeroBody = yup.InferType<typeof createCmsHeroSchema>;
export type UpdateCmsHeroBody = yup.InferType<typeof updateCmsHeroSchema>;