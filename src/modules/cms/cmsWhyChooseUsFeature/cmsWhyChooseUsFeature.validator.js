import * as yup from "yup";
export const createCmsWhyChooseUsFeatureSchema = yup.object({
    titlePl: yup.string().required("Title PL is required"),
    titleEn: yup.string().required("Title EN is required"),
    descriptionPl: yup.string().required("Description PL is required"),
    descriptionEn: yup.string().required("Description EN is required"),
    order: yup.number().integer().default(0),
    isActive: yup.boolean().default(true),
});
export const updateCmsWhyChooseUsFeatureSchema = yup.object({
    titlePl: yup.string().optional(),
    titleEn: yup.string().optional(),
    descriptionPl: yup.string().optional(),
    descriptionEn: yup.string().optional(),
    order: yup.number().integer().optional(),
    isActive: yup.boolean().optional(),
});
export const cmsWhyChooseUsFeatureParamsSchema = yup.object({
    id: yup.string().uuid("Invalid ID format").required("ID is required"),
});
