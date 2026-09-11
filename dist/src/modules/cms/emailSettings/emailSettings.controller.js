import sendResponse from "../../../shared/utils/response.js";
import * as emailSettingsService from "./emailSettings.service.js";
export const getEmailSettings = async (req, res, next) => {
    try {
        const result = await emailSettingsService.getEmailSettingsService();
        sendResponse(res, 200, true, "Email settings fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const updateEmailSettings = async (req, res, next) => {
    try {
        const result = await emailSettingsService.updateEmailSettingsService(req.body);
        sendResponse(res, 200, true, "Email settings updated successfully", result);
    }
    catch (error) {
        next(error);
    }
};
