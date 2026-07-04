import * as yup from "yup";
const emptyStringToUndefined = (value, originalValue) => originalValue === "" ? undefined : value;
export const addonIdParamsSchema = yup.object({
    id: yup.string().required("Addon ID is required"),
});
export const createAddonBodySchema = yup.object({
    name: yup.string().trim().required("Name is required"),
    description: yup.string().trim().required("Description is required"),
    price: yup
        .number()
        .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
        .positive("Price must be greater than 0")
        .required("Price is required"),
});
export const updateAddonBodySchema = yup.object({
    name: yup.string().trim().optional(),
    description: yup.string().trim().optional(),
    price: yup
        .number()
        .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
        .positive("Price must be greater than 0")
        .optional(),
});
