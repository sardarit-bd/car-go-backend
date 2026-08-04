import * as yup from "yup";
const emptyStringToUndefined = (value, originalValue) => originalValue === "" ? undefined : value;
export const packageIdParamsSchema = yup.object({
    id: yup.string().required("Package ID is required"),
});
export const createPackageBodySchema = yup.object({
    name: yup.string().trim().required("Name is required"),
    description: yup
        .array()
        .of(yup.string().trim().required())
        .min(1, "At least one description item is required")
        .required("Description is required"),
    price: yup
        .number()
        .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
        .min(0, "Price cannot be negative")
        .required("Price is required"),
});
export const updatePackageBodySchema = yup.object({
    name: yup.string().trim().optional(),
    description: yup.array().of(yup.string().trim().required()).min(1).optional(),
    price: yup
        .number()
        .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
        .min(0, "Price cannot be negative")
        .optional(),
});
