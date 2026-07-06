import * as cmsFaqService from "./cmsFaq.service.js";
import sendResponse from "../../../shared/utils/response.js";
export const createCmsFaq = async (req, res, next) => {
    try {
        const faq = await cmsFaqService.createCmsFaqService(req.body);
        return sendResponse(res, 201, true, "FAQ created successfully", faq);
    }
    catch (error) {
        next(error);
    }
};
export const getAllCmsFaqs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await cmsFaqService.getAllCmsFaqsService(page, limit);
        return sendResponse(res, 200, true, "FAQs retrieved successfully", result.data, result.pagination);
    }
    catch (error) {
        next(error);
    }
};
export const getCmsFaqById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const faq = await cmsFaqService.getCmsFaqByIdService(id);
        return sendResponse(res, 200, true, "FAQ retrieved successfully", faq);
    }
    catch (error) {
        next(error);
    }
};
export const updateCmsFaq = async (req, res, next) => {
    try {
        const { id } = req.params;
        const faq = await cmsFaqService.updateCmsFaqService(id, req.body);
        return sendResponse(res, 200, true, "FAQ updated successfully", faq);
    }
    catch (error) {
        next(error);
    }
};
export const deleteCmsFaq = async (req, res, next) => {
    try {
        const { id } = req.params;
        await cmsFaqService.deleteCmsFaqService(id);
        // Pass the entire result object, which contains both data and pagination
        await cmsFaqService.deleteCmsFaqService(id);
        return sendResponse(res, 200, true, "FAQ deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
