import * as locationRepository from "./location.repository";
import AppError from "../../shared/utils/AppError";
import { CreateLocationBody, UpdateLocationBody } from "./location.validator";

export const getAllLocations = async () => {
  return locationRepository.findAllLocations();
};

export const getLocationById = async (id: string) => {
  const location = await locationRepository.findLocationById(id);
  if (!location) {
    throw new AppError("Location not found", 404);
  }
  return location;
};

export const createLocation = async (data: CreateLocationBody) => {
  return locationRepository.createLocation(data);
};

export const updateLocation = async (id: string, data: UpdateLocationBody) => {
  const location = await locationRepository.findLocationById(id);
  if (!location) {
    throw new AppError("Location not found", 404);
  }
  return locationRepository.updateLocation(id, data);
};

export const deleteLocation = async (id: string) => {
  const location = await locationRepository.findLocationById(id);
  if (!location) {
    throw new AppError("Location not found", 404);
  }
  await locationRepository.softDeleteLocation(id);
};