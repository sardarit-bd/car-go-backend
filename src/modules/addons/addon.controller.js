import sendResponse from "../../shared/utils/response";
import * as addonService from "./addon.service";
export const getAddons = async (req, res, next) => {
    try {
        const result = await addonService.getAllAddons();
        sendResponse(res, 200, true, "Addons fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const createAddon = async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await addonService.createAddon(req.body);
        sendResponse(res, 201, true, "Addon created successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const updateAddon = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await addonService.updateAddon(id, req.body);
        sendResponse(res, 200, true, "Addon updated successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const deleteAddon = async (req, res, next) => {
    try {
        const { id } = req.params;
        await addonService.deleteAddon(id);
        sendResponse(res, 200, true, "Addon deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
