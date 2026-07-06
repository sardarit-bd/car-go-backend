import * as locationRepository from "./location.repository.js";
import AppError from "../../shared/utils/AppError.js";
export const getAllLocations = async () => {
    return locationRepository.findAllLocations();
};
export const getLocationById = async (id) => {
    const location = await locationRepository.findLocationById(id);
    if (!location) {
        throw new AppError("Location not found", 404);
    }
    return location;
};
export const createLocation = async (data) => {
    return locationRepository.createLocation(data);
};
export const updateLocation = async (id, data) => {
    const location = await locationRepository.findLocationById(id);
    if (!location) {
        throw new AppError("Location not found", 404);
    }
    return locationRepository.updateLocation(id, data);
};
export const deleteLocation = async (id) => {
    const location = await locationRepository.findLocationById(id);
    if (!location) {
        throw new AppError("Location not found", 404);
    }
    await locationRepository.softDeleteLocation(id);
};
