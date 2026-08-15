import * as yup from "yup";

export const addonIdParamsSchema = yup.object({
  id: yup.string().required("Addon ID is required"),
});

export const createAddonBodySchema = yup.object({
  nameEn: yup.string().trim().required("Name (EN) is required"),
  namePl: yup.string().trim().required("Name (PL) is required"),
  descriptionEn: yup.string().trim().required("Description (EN) is required"),
  descriptionPl: yup.string().trim().required("Description (PL) is required"),
  price: yup
    .number()
    .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
    .positive("Price must be greater than 0")
    .required("Price is required"),
  image: yup.string().optional(),
});

export const updateAddonBodySchema = yup.object({
  nameEn: yup.string().trim().optional(),
  namePl: yup.string().trim().optional(),
  descriptionEn: yup.string().trim().optional(),
  descriptionPl: yup.string().trim().optional(),
  price: yup
    .number()
    .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
    .positive("Price must be greater than 0")
    .optional(),
  image: yup.string().optional(),
});

export type CreateAddonBody = yup.InferType<typeof createAddonBodySchema>;
export type UpdateAddonBody = yup.InferType<typeof updateAddonBodySchema>;
