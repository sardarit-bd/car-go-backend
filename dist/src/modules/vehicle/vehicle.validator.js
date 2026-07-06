import * as yup from "yup";
const emptyStringToUndefined = (value, originalValue) => originalValue === "" ? undefined : value;
export const getVehiclesQuerySchema = yup.object({
    model: yup.string().trim().optional(),
    search: yup.string().trim().optional(),
    transmission: yup.string().trim().optional(),
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
        .test("return-after-pickup", "returnDate must be after pickupDate", function (returnDate) {
        const { pickupDate } = this.parent;
        if (!pickupDate || !returnDate)
            return true;
        return returnDate.getTime() > pickupDate.getTime();
    }),
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
const parseJsonString = (value) => {
    if (typeof value !== "string")
        return value;
    try {
        return JSON.parse(value);
    }
    catch {
        return value;
    }
};
export const vehicleIdParamsSchema = yup.object({
    id: yup.string().required("Vehicle ID is required"),
});
export const createVehicleBodySchema = yup.object({
    ownerId: yup.string().trim().required("Owner ID is required"),
    name: yup.string().trim().required("Name is required"),
    brand: yup.string().trim().required("Brand is required"),
    model: yup.string().trim().required("Model is required"),
    description: yup.string().trim().required("Description is required"),
    class: yup.string().trim().required("Class is required"),
    seats: yup
        .number()
        .transform((_, val) => (typeof val === "string" ? parseInt(val, 10) : val))
        .integer("Seats must be a whole number")
        .positive("Seats must be greater than 0")
        .required("Seats is required"),
    pricePerDay: yup
        .number()
        .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
        .positive("Price per day must be greater than 0")
        .required("Price per day is required"),
    locations: yup
        .array()
        .of(yup.object({
        country: yup.string().trim().required(),
        city: yup.string().trim().required(),
        address: yup.string().trim().optional(),
    }))
        .transform(parseJsonString)
        .optional(),
    availabilities: yup
        .array()
        .of(yup.object({
        availableFrom: yup.date().required(),
        availableTo: yup.date().required(),
    }))
        .transform(parseJsonString)
        .optional(),
});
export const updateVehicleBodySchema = yup.object({
    ownerId: yup.string().trim().optional(),
    name: yup.string().trim().optional(),
    brand: yup.string().trim().optional(),
    model: yup.string().trim().optional(),
    description: yup.string().trim().optional(),
    class: yup.string().trim().optional(),
    seats: yup
        .number()
        .transform((_, val) => (typeof val === "string" ? parseInt(val, 10) : val))
        .integer("Seats must be a whole number")
        .positive("Seats must be greater than 0")
        .optional(),
    pricePerDay: yup
        .number()
        .transform((_, val) => (typeof val === "string" ? parseFloat(val) : val))
        .positive("Price per day must be greater than 0")
        .optional(),
    locations: yup
        .array()
        .of(yup.object({
        country: yup.string().trim().required(),
        city: yup.string().trim().required(),
        address: yup.string().trim().optional(),
    }))
        .transform(parseJsonString)
        .optional(),
    availabilities: yup
        .array()
        .of(yup.object({
        availableFrom: yup.date().required(),
        availableTo: yup.date().required(),
    }))
        .transform(parseJsonString)
        .optional(),
});
