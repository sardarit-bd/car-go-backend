import * as cmsSocialMediaRepository from "./cmsSocialMedia.repository.js";
import AppError from "../../../shared/utils/AppError.js";
export const createCmsSocialMediaService = async (data) => {
    return cmsSocialMediaRepository.createCmsSocialMedia(data);
};
export const getAllCmsSocialMediaService = async () => {
    return cmsSocialMediaRepository.findAllCmsSocialMedia();
};
export const getCmsSocialMediaByIdService = async (id) => {
    const socialMedia = await cmsSocialMediaRepository.findCmsSocialMediaById(id);
    if (!socialMedia) {
        throw new AppError("Social media link not found", 404);
    }
    return socialMedia;
};
export const updateCmsSocialMediaService = async (id, data) => {
    const socialMedia = await cmsSocialMediaRepository.findCmsSocialMediaById(id);
    if (!socialMedia) {
        throw new AppError("Social media link not found", 404);
    }
    return cmsSocialMediaRepository.updateCmsSocialMedia(id, data);
};
export const deleteCmsSocialMediaService = async (id) => {
    const socialMedia = await cmsSocialMediaRepository.findCmsSocialMediaById(id);
    if (!socialMedia) {
        throw new AppError("Social media link not found", 404);
    }
    return cmsSocialMediaRepository.softDeleteCmsSocialMedia(id);
};
