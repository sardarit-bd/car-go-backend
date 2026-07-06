import * as cmsWhyChooseUsRepository from "./cmsWhyChooseUs.repository.js";
import AppError from "../../../shared/utils/AppError.js";
export const createCmsWhyChooseUsService = async (data) => {
    return cmsWhyChooseUsRepository.createCmsWhyChooseUs(data);
};
export const getCmsWhyChooseUsService = async () => {
    const section = await cmsWhyChooseUsRepository.findCmsWhyChooseUs();
    if (!section) {
        throw new AppError("Why Choose Us section not found", 404);
    }
    return section;
};
export const getCmsWhyChooseUsByIdService = async (id) => {
    const section = await cmsWhyChooseUsRepository.findCmsWhyChooseUsById(id);
    if (!section) {
        throw new AppError("Why Choose Us section not found", 404);
    }
    return section;
};
export const updateCmsWhyChooseUsService = async (id, data) => {
    const section = await cmsWhyChooseUsRepository.findCmsWhyChooseUsById(id);
    if (!section) {
        throw new AppError("Why Choose Us section not found", 404);
    }
    return cmsWhyChooseUsRepository.updateCmsWhyChooseUs(id, data);
};
export const deleteCmsWhyChooseUsService = async (id) => {
    const section = await cmsWhyChooseUsRepository.findCmsWhyChooseUsById(id);
    if (!section) {
        throw new AppError("Why Choose Us section not found", 404);
    }
    return cmsWhyChooseUsRepository.softDeleteCmsWhyChooseUs(id);
};
