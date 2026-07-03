import * as yup from "yup";

export const createCmsContactSchema = yup.object({
  type: yup
    .string()
    .oneOf(["EMAIL", "PHONE", "ADDRESS"], "Invalid contact type")
    .required("Contact type is required"),
  value: yup.string().required("Value is required"),
  label: yup.string().optional(),
});

export const updateCmsContactSchema = yup.object({
  value: yup.string().optional(),
  label: yup.string().optional(),
});

export const cmsContactParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});

export type CreateCmsContactBody = yup.InferType<typeof createCmsContactSchema>;
export type UpdateCmsContactBody = yup.InferType<typeof updateCmsContactSchema>;