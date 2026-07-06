import sendResponse from "../../shared/utils/response.js";
import * as locationService from "./location.service.js";
export const getLocations = async (req, res, next) => {
    try {
        const result = await locationService.getAllLocations();
        sendResponse(res, 200, true, "Locations fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const createLocation = async (req, res, next) => {
    try {
        const result = await locationService.createLocation(req.body);
        sendResponse(res, 201, true, "Location created successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const updateLocation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await locationService.updateLocation(id, req.body);
        sendResponse(res, 200, true, "Location updated successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteLocation = async (req, res, next) => {
    try {
        const { id } = req.params;
        await locationService.deleteLocation(id);
        sendResponse(res, 200, true, "Location deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
