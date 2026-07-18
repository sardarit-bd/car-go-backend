import { findCmsAboutUs, findCmsAboutUsById, createOrUpdateCmsAboutUs, softDeleteCmsAboutUs, } from "./cmsAboutUs.repository.js";
import AppError from "../../../shared/utils/AppError.js";
export const getCmsAboutUs = async () => {
    const aboutUs = await findCmsAboutUs();
    if (!aboutUs) {
        throw new AppError("About Us content not found", 404);
    }
    return aboutUs;
};
export const createOrUpdateCmsAboutUsService = async (data) => {
    return await createOrUpdateCmsAboutUs(data);
};
export const deleteCmsAboutUsService = async (id) => {
    const aboutUs = await findCmsAboutUsById(id);
    if (!aboutUs) {
        throw new AppError("About Us content not found", 404);
    }
    return await softDeleteCmsAboutUs(id);
};
