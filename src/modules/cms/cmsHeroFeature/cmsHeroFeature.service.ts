import * as cmsHeroFeatureRepository from "./cmsHeroFeature.repository.js";
import AppError from "../../../shared/utils/AppError.js";

export const createCmsHeroFeatureService = async (data: any) => {
  return cmsHeroFeatureRepository.createCmsHeroFeature(data);
};

export const getAllCmsHeroFeaturesService = async () => {
  return cmsHeroFeatureRepository.findAllCmsHeroFeatures();
};

export const getCmsHeroFeatureByIdService = async (id: string) => {
  const feature = await cmsHeroFeatureRepository.findCmsHeroFeatureById(id);
  if (!feature) {
    throw new AppError("Hero feature not found", 404);
  }
  return feature;
};

export const updateCmsHeroFeatureService = async (id: string, data: any) => {
  const feature = await cmsHeroFeatureRepository.findCmsHeroFeatureById(id);
  if (!feature) {
    throw new AppError("Hero feature not found", 404);
  }
  return cmsHeroFeatureRepository.updateCmsHeroFeature(id, data);
};

export const deleteCmsHeroFeatureService = async (id: string) => {
  const feature = await cmsHeroFeatureRepository.findCmsHeroFeatureById(id);
  if (!feature) {
    throw new AppError("Hero feature not found", 404);
  }
  return cmsHeroFeatureRepository.softDeleteCmsHeroFeature(id);
};