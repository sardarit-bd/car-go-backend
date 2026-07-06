import * as cmsPageService from "./cmsPage.service.js";
import sendResponse from "../../../shared/utils/response.js";
export const createCmsPage = async (req, res, next) => {
    try {
        const page = await cmsPageService.createCmsPageService(req.body);
        return sendResponse(res, 201, true, "Page created/updated successfully", page);
    }
    catch (error) {
        next(error);
    }
};
export const getAllCmsPages = async (req, res, next) => {
    try {
        const pages = await cmsPageService.getAllCmsPagesService();
        return sendResponse(res, 200, true, "Pages retrieved successfully", pages);
    }
    catch (error) {
        next(error);
    }
};
export const getCmsPageById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const page = await cmsPageService.getCmsPageByIdService(id);
        return sendResponse(res, 200, true, "Page retrieved successfully", page);
    }
    catch (error) {
        next(error);
    }
};
export const getCmsPageByType = async (req, res, next) => {
    try {
        const { type } = req.params;
        const page = await cmsPageService.getCmsPageByTypeService(type);
        return sendResponse(res, 200, true, "Page retrieved successfully", page);
    }
    catch (error) {
        next(error);
    }
};
export const updateCmsPage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const page = await cmsPageService.updateCmsPageService(id, req.body);
        return sendResponse(res, 200, true, "Page updated successfully", page);
    }
    catch (error) {
        next(error);
    }
};
export const deleteCmsPage = async (req, res, next) => {
    try {
        const { id } = req.params;
        await cmsPageService.deleteCmsPageService(id);
        return sendResponse(res, 200, true, "Page deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
