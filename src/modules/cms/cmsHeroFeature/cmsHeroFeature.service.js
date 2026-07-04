import * as cmsHeroFeatureRepository from "./cmsHeroFeature.repository";
import AppError from "../../../shared/utils/AppError";
export const createCmsHeroFeatureService = async (data) => {
    return cmsHeroFeatureRepository.createCmsHeroFeature(data);
};
export const getAllCmsHeroFeaturesService = async () => {
    return cmsHeroFeatureRepository.findAllCmsHeroFeatures();
};
export const getCmsHeroFeatureByIdService = async (id) => {
    const feature = await cmsHeroFeatureRepository.findCmsHeroFeatureById(id);
    if (!feature) {
        throw new AppError("Hero feature not found", 404);
    }
    return feature;
};
export const updateCmsHeroFeatureService = async (id, data) => {
    const feature = await cmsHeroFeatureRepository.findCmsHeroFeatureById(id);
    if (!feature) {
        throw new AppError("Hero feature not found", 404);
    }
    return cmsHeroFeatureRepository.updateCmsHeroFeature(id, data);
};
export const deleteCmsHeroFeatureService = async (id) => {
    const feature = await cmsHeroFeatureRepository.findCmsHeroFeatureById(id);
    if (!feature) {
        throw new AppError("Hero feature not found", 404);
    }
    return cmsHeroFeatureRepository.softDeleteCmsHeroFeature(id);
};
