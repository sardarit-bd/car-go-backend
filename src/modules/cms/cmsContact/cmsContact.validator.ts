import * as yup from "yup";

export const createCmsContactSchema = yup.object({
  type: yup
    .string()
    .oneOf(
      [
        "EMAIL",
        "PHONE",
        "ADDRESS",
        "HOURS",
        "COMPANY_NAME",
        "COMPANY_NIP",
        "COMPANY_ADDRESS",
      ],
      "Invalid contact type",
    )
    .required("Contact type is required"),
  value: yup
    .string()
    .required("Value is required")
    .test(
      "value-format",
      "Invalid format for this contact type",
      function (value) {
        const { type } = this.parent;
        if (type === "EMAIL") {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
        if (type === "PHONE") {
          return /^\+?[0-9\s\-()]{7,20}$/.test(value);
        }
        if (type === "COMPANY_NIP") {
          return /^[0-9]{10}$/.test(value);
        }
        return true;
      },
    ),
  label: yup.string().optional(),
});

export const updateCmsContactSchema = yup.object({
  type: yup
    .string()
    .oneOf([
      "EMAIL",
      "PHONE",
      "ADDRESS",
      "HOURS",
      "COMPANY_NAME",
      "COMPANY_NIP",
      "COMPANY_ADDRESS",
    ])
    .optional(),
  value: yup
    .string()
    .optional()
    .test(
      "value-format",
      "Invalid format for this contact type",
      function (value) {
        if (!value) return true;
        const { type } = this.parent;
        if (type === "EMAIL") {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
        if (type === "PHONE") {
          return /^\+?[0-9\s\-()]{7,20}$/.test(value);
        }
        if (type === "COMPANY_NIP") {
          return /^[0-9]{10}$/.test(value);
        }
        return true;
      },
    ),
  label: yup.string().optional(),
});

export const cmsContactParamsSchema = yup.object({
  id: yup.string().uuid("Invalid ID format").required("ID is required"),
});

export type CreateCmsContactBody = yup.InferType<typeof createCmsContactSchema>;
export type UpdateCmsContactBody = yup.InferType<typeof updateCmsContactSchema>;
