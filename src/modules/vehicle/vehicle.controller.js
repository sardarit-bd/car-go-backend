import sendResponse from "../../shared/utils/response";
import { getAvailableVehicles } from "./vehicle.service";
import * as vehicleService from "./vehicle.service";
export const getVehicles = async (req, res, next) => {
    try {
        const query = req.query;
        const result = await getAvailableVehicles(query);
        sendResponse(res, 200, true, "Vehicles fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const getVehicleById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await vehicleService.getVehicleById(id);
        sendResponse(res, 200, true, "Vehicle fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const createVehicle = async (req, res, next) => {
    try {
        const files = req.files;
        const result = await vehicleService.createVehicle(req.body, files);
        sendResponse(res, 201, true, "Vehicle created successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const updateVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const files = req.files;
        const result = await vehicleService.updateVehicle(id, req.body, files);
        sendResponse(res, 200, true, "Vehicle updated successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;
        await vehicleService.deleteVehicle(id);
        sendResponse(res, 200, true, "Vehicle deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
