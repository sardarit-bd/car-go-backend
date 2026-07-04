import * as yup from "yup";

export const createCmsHeroSchema = yup.object({
  taglinePl: yup.string().optional(),
  taglineEn: yup.string().optional(),
  titlePl: yup.string().required("Title PL is required"),
  titleEn: yup.string().required("Title EN is required"),
  subtitlePl: yup.string().required("Subtitle PL is required"),
  subtitleEn: yup.string().required("Subtitle EN is required"),
});

export const updateCmsHeroSchema = yup.object({
  taglinePl: yup.string().optional(),
  taglineEn: yup.string().optional(),
  titlePl: yup.string().optional(),
  titleEn: yup.string().optional(),
  subtitlePl: yup.string().optional(),
  subtitleEn: yup.string().optional(),
});

export const cmsHeroParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});

export type CreateCmsHeroBody = yup.InferType<typeof createCmsHeroSchema>;
export type UpdateCmsHeroBody = yup.InferType<typeof updateCmsHeroSchema>;