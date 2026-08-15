import * as yup from "yup";
export const createCmsPageSchema = yup.object({
    type: yup
        .string()
        .oneOf(["PRIVACY_POLICY", "TERMS_CONDITIONS", "COOKIE_POLICY"], "Invalid page type")
        .required("Page type is required"),
    contentPl: yup.string().required("Content (PL) is required"),
    contentEn: yup.string().required("Content (EN) is required"),
});
export const updateCmsPageSchema = yup.object({
    contentPl: yup.string().optional(),
    contentEn: yup.string().optional(),
});
export const cmsPageParamsSchema = yup.object({
    id: yup.string().uuid("Invalid ID format").required("ID is required"),
});
export const cmsPageTypeParamsSchema = yup.object({
    type: yup
        .string()
        .oneOf(["PRIVACY_POLICY", "TERMS_CONDITIONS", "COOKIE_POLICY"])
        .required("Page type is required"),
});
