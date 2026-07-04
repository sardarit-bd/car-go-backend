import * as cmsWhyChooseUsService from "./cmsWhyChooseUs.service";
import sendResponse from "../../../shared/utils/response";
export const createCmsWhyChooseUs = async (req, res, next) => {
    try {
        // If an image was uploaded, set the mainImage path in req.body
        if (req.file) {
            req.body.mainImage = `/uploads/${req.file.filename}`;
        }
        const section = await cmsWhyChooseUsService.createCmsWhyChooseUsService(req.body);
        return sendResponse(res, 201, true, "Why Choose Us section created/updated successfully", section);
    }
    catch (error) {
        next(error);
    }
};
export const getCmsWhyChooseUs = async (req, res, next) => {
    try {
        const section = await cmsWhyChooseUsService.getCmsWhyChooseUsService();
        return sendResponse(res, 200, true, "Why Choose Us section retrieved successfully", section);
    }
    catch (error) {
        next(error);
    }
};
export const getCmsWhyChooseUsById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const section = await cmsWhyChooseUsService.getCmsWhyChooseUsByIdService(id);
        return sendResponse(res, 200, true, "Why Choose Us section retrieved successfully", section);
    }
    catch (error) {
        next(error);
    }
};
export const updateCmsWhyChooseUs = async (req, res, next) => {
    try {
        // If a new image was uploaded, update the mainImage path in req.body
        if (req.file) {
            req.body.mainImage = `/uploads/${req.file.filename}`;
        }
        const { id } = req.params;
        const section = await cmsWhyChooseUsService.updateCmsWhyChooseUsService(id, req.body);
        return sendResponse(res, 200, true, "Why Choose Us section updated successfully", section);
    }
    catch (error) {
        next(error);
    }
};
export const deleteCmsWhyChooseUs = async (req, res, next) => {
    try {
        const { id } = req.params;
        await cmsWhyChooseUsService.deleteCmsWhyChooseUsService(id);
        return sendResponse(res, 200, true, "Why Choose Us section deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
