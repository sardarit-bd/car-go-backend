import * as yup from "yup";

const emptyStringToUndefined = (value: unknown, originalValue: unknown) =>
  originalValue === "" ? undefined : value;

// Reusing the exact statuses from your BookingStatus enum
const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;

export const reservationIdParamsSchema = yup.object({
  id: yup.string().required("Reservation ID is required"),
});

export const phoneNumberParamsSchema = yup.object({
  phoneNumber: yup.string().required("Phone number is required"),
});

export const createReservationBodySchema = yup.object({
  vehicleId: yup.string().trim().required("Vehicle ID is required"),
  phoneNumber: yup.string().trim().required("Phone number is required"),
  pickupDate: yup.date().typeError("Invalid pickup date").required("Pickup date is required"),
  returnDate: yup.date().typeError("Invalid return date").required("Return date is required"),
  pickupLocationId: yup.string().trim().optional(),
  returnLocationId: yup.string().trim().optional(),
  totalPrice: yup
    .number()
    .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
    .positive("Total price must be greater than 0")
    .required("Total price is required"),
});

export const updateReservationBodySchema = yup.object({
  vehicleId: yup.string().trim().optional(),
  phoneNumber: yup.string().trim().optional(),
  pickupDate: yup.date().typeError("Invalid pickup date").optional(),
  returnDate: yup.date().typeError("Invalid return date").optional(),
  pickupLocationId: yup.string().trim().optional(),
  returnLocationId: yup.string().trim().optional(),
  totalPrice: yup
    .number()
    .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
    .positive("Total price must be greater than 0")
    .optional(),
});

export const updateStatusBodySchema = yup.object({
  status: yup.string().oneOf(validStatuses, `Status must be one of: ${validStatuses.join(", ")}`).required("Status is required"),
});

export const updateQuoteBodySchema = yup.object({
  totalPrice: yup
    .number()
    .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
    .positive("Total price must be greater than 0")
    .required("Total price is required"),
});