import * as yup from "yup";
export const packageIdParamsSchema = yup.object({
    id: yup.string().required("Package ID is required"),
});
export const createPackageBodySchema = yup.object({
    nameEn: yup.string().trim().required("Name (EN) is required"),
    namePl: yup.string().trim().required("Name (PL) is required"),
    descriptionEn: yup
        .array()
        .of(yup.string().trim().required())
        .min(1, "At least one feature (EN) is required")
        .required("Description (EN) is required"),
    descriptionPl: yup
        .array()
        .of(yup.string().trim().required())
        .min(1, "At least one feature (PL) is required")
        .required("Description (PL) is required"),
    price: yup
        .number()
        .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
        .min(0, "Price cannot be negative")
        .required("Price is required"),
});
export const updatePackageBodySchema = yup.object({
    nameEn: yup.string().trim().optional(),
    namePl: yup.string().trim().optional(),
    descriptionEn: yup
        .array()
        .of(yup.string().trim().required())
        .min(1)
        .optional(),
    descriptionPl: yup
        .array()
        .of(yup.string().trim().required())
        .min(1)
        .optional(),
    price: yup
        .number()
        .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
        .min(0, "Price cannot be negative")
        .optional(),
});
