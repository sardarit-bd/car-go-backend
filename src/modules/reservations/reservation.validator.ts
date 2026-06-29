import * as yup from "yup";

const emptyStringToUndefined = (value: unknown, originalValue: unknown) =>
  originalValue === "" ? undefined : value;

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
  pickupLocationId: yup.string().trim().optional().nullable(),
  returnLocationId: yup.string().trim().optional().nullable(),
  totalPrice: yup
    .number()
    .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
    .min(0, "Total price must be 0 or greater") 
    .required("Total price is required"),
    

  customerFirstName: yup.string().trim().required("First name is required"),
  customerLastName: yup.string().trim().required("Last name is required"),
  customerEmail: yup.string().email("Invalid email").required("Email is required"),
  customerNotes: yup.string().trim().optional().nullable(),
  packageData: yup.mixed().optional().nullable(), 
  addonsData: yup.mixed().optional().nullable(), 
 
});

export const updateReservationBodySchema = yup.object({
  vehicleId: yup.string().trim().optional(),
  phoneNumber: yup.string().trim().optional(),
  pickupDate: yup.date().typeError("Invalid pickup date").optional(),
  returnDate: yup.date().typeError("Invalid return date").optional(),
  pickupLocationId: yup.string().trim().optional().nullable(),
  returnLocationId: yup.string().trim().optional().nullable(),
  totalPrice: yup
    .number()
    .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
    .min(0, "Total price must be 0 or greater")
    .optional(),
  customerFirstName: yup.string().trim().optional(),
  customerLastName: yup.string().trim().optional(),
  customerEmail: yup.string().email("Invalid email").optional(),
  customerNotes: yup.string().trim().optional().nullable(),
  packageData: yup.mixed().optional().nullable(),
  addonsData: yup.mixed().optional().nullable(),
});

export const updateStatusBodySchema = yup.object({
  status: yup.string().oneOf(validStatuses, `Status must be one of: ${validStatuses.join(", ")}`).required("Status is required"),
});

export const updateQuoteBodySchema = yup.object({
  totalPrice: yup
    .number()
    .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
    .min(0, "Total price must be 0 or greater")
    .required("Total price is required"),
});