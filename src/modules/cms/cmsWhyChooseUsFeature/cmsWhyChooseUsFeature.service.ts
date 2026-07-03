import * as cmsWhyChooseUsFeatureRepository from "./cmsWhyChooseUsFeature.repository";
import AppError from "../../../shared/utils/AppError";

export const createCmsWhyChooseUsFeatureService = async (data: any) => {
  return cmsWhyChooseUsFeatureRepository.createCmsWhyChooseUsFeature(data);
};

export const getAllCmsWhyChooseUsFeaturesService = async () => {
  return cmsWhyChooseUsFeatureRepository.findAllCmsWhyChooseUsFeatures();
};

export const getCmsWhyChooseUsFeatureByIdService = async (id: string) => {
  const feature = await cmsWhyChooseUsFeatureRepository.findCmsWhyChooseUsFeatureById(id);
  if (!feature) {
    throw new AppError("Why Choose Us feature not found", 404);
  }
  return feature;
};

export const updateCmsWhyChooseUsFeatureService = async (id: string, data: any) => {
  const feature = await cmsWhyChooseUsFeatureRepository.findCmsWhyChooseUsFeatureById(id);
  if (!feature) {
    throw new AppError("Why Choose Us feature not found", 404);
  }
  return cmsWhyChooseUsFeatureRepository.updateCmsWhyChooseUsFeature(id, data);
};

export const deleteCmsWhyChooseUsFeatureService = async (id: string) => {
  const feature = await cmsWhyChooseUsFeatureRepository.findCmsWhyChooseUsFeatureById(id);
  if (!feature) {
    throw new AppError("Why Choose Us feature not found", 404);
  }
  return cmsWhyChooseUsFeatureRepository.softDeleteCmsWhyChooseUsFeature(id);
};