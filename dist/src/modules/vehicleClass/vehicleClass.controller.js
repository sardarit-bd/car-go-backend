import sendResponse from "../../shared/utils/response.js";
import * as vehicleClassService from "./vehicleClass.service.js";
export const getVehicleClasses = async (req, res, next) => {
    try {
        const result = await vehicleClassService.getAllVehicleClasses();
        sendResponse(res, 200, true, "Vehicle classes fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const createVehicleClass = async (req, res, next) => {
    try {
        const result = await vehicleClassService.createVehicleClass(req.body);
        sendResponse(res, 201, true, "Vehicle class created successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const updateVehicleClass = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await vehicleClassService.updateVehicleClass(id, req.body);
        sendResponse(res, 200, true, "Vehicle class updated successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteVehicleClass = async (req, res, next) => {
    try {
        const { id } = req.params;
        await vehicleClassService.deleteVehicleClass(id);
        sendResponse(res, 200, true, "Vehicle class deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
