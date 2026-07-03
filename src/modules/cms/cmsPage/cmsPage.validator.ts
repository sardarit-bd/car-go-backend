import * as yup from "yup";

export const createCmsPageSchema = yup.object({
  type: yup
    .string()
    .oneOf(["PRIVACY_POLICY", "TERMS_CONDITIONS"], "Invalid page type")
    .required("Page type is required"),
  content: yup.string().required("Content is required"),
});

export const updateCmsPageSchema = yup.object({
  content: yup.string().required("Content is required"),
});

export const cmsPageParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});

export const cmsPageTypeParamsSchema = yup.object({
  type: yup
    .string()
    .oneOf(["PRIVACY_POLICY", "TERMS_CONDITIONS"])
    .required("Page type is required"),
});

export type CreateCmsPageBody = yup.InferType<typeof createCmsPageSchema>;
export type UpdateCmsPageBody = yup.InferType<typeof updateCmsPageSchema>;