import * as yup from "yup";

export const vehicleClassIdParamsSchema = yup.object({
  id: yup.string().required("Vehicle class ID is required"),
});

export const createVehicleClassBodySchema = yup.object({
  name: yup.string().trim().required("Class name is required"),
});

export const updateVehicleClassBodySchema = yup.object({
  name: yup.string().trim().required("Class name is required"),
});

export type CreateVehicleClassBody = yup.InferType<
  typeof createVehicleClassBodySchema
>;
export type UpdateVehicleClassBody = yup.InferType<
  typeof updateVehicleClassBodySchema
>;
