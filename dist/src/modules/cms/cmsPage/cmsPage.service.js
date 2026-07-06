import * as cmsPageRepository from "./cmsPage.repository.js";
import AppError from "../../../shared/utils/AppError.js";
export const createCmsPageService = async (data) => {
    return cmsPageRepository.createCmsPage(data);
};
export const getAllCmsPagesService = async () => {
    return cmsPageRepository.findAllCmsPages();
};
export const getCmsPageByIdService = async (id) => {
    const page = await cmsPageRepository.findCmsPageById(id);
    if (!page) {
        throw new AppError("Page not found", 404);
    }
    return page;
};
export const getCmsPageByTypeService = async (type) => {
    const page = await cmsPageRepository.findCmsPageByType(type);
    if (!page) {
        throw new AppError("Page not found", 404);
    }
    return page;
};
export const updateCmsPageService = async (id, data) => {
    const page = await cmsPageRepository.findCmsPageById(id);
    if (!page) {
        throw new AppError("Page not found", 404);
    }
    return cmsPageRepository.updateCmsPage(id, data);
};
export const deleteCmsPageService = async (id) => {
    const page = await cmsPageRepository.findCmsPageById(id);
    if (!page) {
        throw new AppError("Page not found", 404);
    }
    return cmsPageRepository.softDeleteCmsPage(id);
};
