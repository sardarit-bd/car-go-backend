import * as vehicleClassRepository from "./vehicleClass.repository.js";
import AppError from "../../shared/utils/AppError.js";
import {
  CreateVehicleClassBody,
  UpdateVehicleClassBody,
} from "./vehicleClass.validator.js";

export const getAllVehicleClasses = async () => {
  return vehicleClassRepository.findAllVehicleClasses();
};

export const createVehicleClass = async (data: CreateVehicleClassBody) => {
  return vehicleClassRepository.createVehicleClass(data);
};

export const updateVehicleClass = async (
  id: string,
  data: UpdateVehicleClassBody,
) => {
  const vehicleClass = await vehicleClassRepository.findVehicleClassById(id);
  if (!vehicleClass) {
    throw new AppError("Vehicle class not found", 404);
  }
  return vehicleClassRepository.updateVehicleClass(id, data);
};

export const deleteVehicleClass = async (id: string) => {
  const vehicleClass = await vehicleClassRepository.findVehicleClassById(id);
  if (!vehicleClass) {
    throw new AppError("Vehicle class not found", 404);
  }
  await vehicleClassRepository.softDeleteVehicleClass(id);
};
