import * as cmsFaqRepository from "./cmsFaq.repository.js";
import AppError from "../../../shared/utils/AppError.js";
export const createCmsFaqService = async (data) => {
    return cmsFaqRepository.createCmsFaq(data);
};
export const getAllCmsFaqsService = async (page = 1, limit = 10) => {
    return cmsFaqRepository.findAllCmsFaqs(page, limit);
};
export const getCmsFaqByIdService = async (id) => {
    const faq = await cmsFaqRepository.findCmsFaqById(id);
    if (!faq) {
        throw new AppError("FAQ not found", 404);
    }
    return faq;
};
export const updateCmsFaqService = async (id, data) => {
    const faq = await cmsFaqRepository.findCmsFaqById(id);
    if (!faq) {
        throw new AppError("FAQ not found", 404);
    }
    return cmsFaqRepository.updateCmsFaq(id, data);
};
export const deleteCmsFaqService = async (id) => {
    const faq = await cmsFaqRepository.findCmsFaqById(id);
    if (!faq) {
        throw new AppError("FAQ not found", 404);
    }
    return cmsFaqRepository.softDeleteCmsFaq(id);
};
