import * as yup from "yup";
export const createCmsHeroFeatureSchema = yup.object({
    textPl: yup.string().required("Text PL is required"),
    textEn: yup.string().required("Text EN is required"),
    order: yup.number().integer().default(0),
    isActive: yup.boolean().default(true),
});
export const updateCmsHeroFeatureSchema = yup.object({
    textPl: yup.string().optional(),
    textEn: yup.string().optional(),
    order: yup.number().integer().optional(),
    isActive: yup.boolean().optional(),
});
export const cmsHeroFeatureParamsSchema = yup.object({
    id: yup.string().uuid("Invalid ID format").required("ID is required"),
});
