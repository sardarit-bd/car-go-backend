import * as yup from "yup";

export const createCmsWhyChooseUsSchema = yup.object({
  subtitlePl: yup.string().optional(),
  subtitleEn: yup.string().optional(),
  titlePl: yup.string().required("Title PL is required"),
  titleEn: yup.string().required("Title EN is required"),
});

export const updateCmsWhyChooseUsSchema = yup.object({
  subtitlePl: yup.string().optional(),
  subtitleEn: yup.string().optional(),
  titlePl: yup.string().optional(),
  titleEn: yup.string().optional(),
});

export const cmsWhyChooseUsParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});