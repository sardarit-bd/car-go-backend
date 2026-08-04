import * as yup from "yup";
const emptyStringToUndefined = (value, originalValue) => originalValue === "" ? undefined : value;
export const locationIdParamsSchema = yup.object({
    id: yup.string().required("Location ID is required"),
});
export const createLocationBodySchema = yup.object({
    name: yup.string().trim().required("Name is required"),
    address: yup.string().trim().required("Address is required"),
    city: yup.string().trim().required("City is required"),
    postalCode: yup
        .string()
        .trim()
        .matches(/^\d{2}-\d{3}$/, "Postal code must be in format XX-XXX")
        .required("Postal code is required"),
    phone: yup.string().trim().optional(),
});
export const updateLocationBodySchema = yup.object({
    name: yup.string().trim().optional(),
    address: yup.string().trim().optional(),
    city: yup.string().trim().optional(),
    postalCode: yup
        .string()
        .trim()
        .matches(/^\d{2}-\d{3}$/, "Postal code must be in format XX-XXX")
        .optional(),
    phone: yup.string().trim().optional(),
});
