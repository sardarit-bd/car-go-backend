import * as yup from "yup";

const emptyStringToUndefined = (value: unknown, originalValue: unknown) =>
  originalValue === "" ? undefined : value;

export const locationIdParamsSchema = yup.object({
  id: yup.string().required("Location ID is required"),
});

export const createLocationBodySchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  address: yup.string().trim().required("Address is required"),
  city: yup.string().trim().required("City is required"),
  country: yup.string().trim().required("Country is required"),
  phone: yup.string().trim().optional(),
});

export const updateLocationBodySchema = yup.object({
  name: yup.string().trim().optional(),
  address: yup.string().trim().optional(),
  city: yup.string().trim().optional(),
  country: yup.string().trim().optional(),
  phone: yup.string().trim().optional(),
});

export type CreateLocationBody = yup.InferType<typeof createLocationBodySchema>;
export type UpdateLocationBody = yup.InferType<typeof updateLocationBodySchema>;