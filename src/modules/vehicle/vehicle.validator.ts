import * as yup from "yup";

const emptyStringToUndefined = (value: unknown, originalValue: unknown) =>
  originalValue === "" ? undefined : value;

export const getVehiclesQuerySchema = yup.object({
  model: yup.string().trim().optional(),

  seats: yup
    .number()
    .transform(emptyStringToUndefined)
    .integer("seats must be a whole number")
    .positive("seats must be greater than 0")
    .optional(),

  location: yup.string().trim().optional(),

  pickupDate: yup
    .date()
    .transform(emptyStringToUndefined)
    .typeError("pickupDate must be a valid date")
    .optional(),

  returnDate: yup
    .date()
    .transform(emptyStringToUndefined)
    .typeError("returnDate must be a valid date")
    .optional()
    .test(
      "return-after-pickup",
      "returnDate must be after pickupDate",
      function (returnDate) {
        const { pickupDate } = this.parent;
        if (!pickupDate || !returnDate) return true; // skip if either is absent
        return returnDate.getTime() > pickupDate.getTime();
      },
    ),

  page: yup
    .number()
    .transform(emptyStringToUndefined)
    .integer()
    .min(1)
    .default(1)
    .optional(),

  limit: yup
    .number()
    .transform(emptyStringToUndefined)
    .integer()
    .min(1)
    .max(50)
    .default(10)
    .optional(),
});

export type GetVehiclesQuery = yup.InferType<typeof getVehiclesQuerySchema>;