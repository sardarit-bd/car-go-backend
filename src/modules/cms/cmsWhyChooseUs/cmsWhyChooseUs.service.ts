import * as cmsWhyChooseUsRepository from "./cmsWhyChooseUs.repository";
import AppError from "../../../shared/utils/AppError";

export const createCmsWhyChooseUsService = async (data: any) => {
  return cmsWhyChooseUsRepository.createCmsWhyChooseUs(data);
};

export const getCmsWhyChooseUsService = async () => {
  const section = await cmsWhyChooseUsRepository.findCmsWhyChooseUs();
  if (!section) {
    throw new AppError("Why Choose Us section not found", 404);
  }
  return section;
};

export const getCmsWhyChooseUsByIdService = async (id: string) => {
  const section = await cmsWhyChooseUsRepository.findCmsWhyChooseUsById(id);
  if (!section) {
    throw new AppError("Why Choose Us section not found", 404);
  }
  return section;
};

export const updateCmsWhyChooseUsService = async (id: string, data: any) => {
  const section = await cmsWhyChooseUsRepository.findCmsWhyChooseUsById(id);
  if (!section) {
    throw new AppError("Why Choose Us section not found", 404);
  }
  return cmsWhyChooseUsRepository.updateCmsWhyChooseUs(id, data);
};

export const deleteCmsWhyChooseUsService = async (id: string) => {
  const section = await cmsWhyChooseUsRepository.findCmsWhyChooseUsById(id);
  if (!section) {
    throw new AppError("Why Choose Us section not found", 404);
  }
  return cmsWhyChooseUsRepository.softDeleteCmsWhyChooseUs(id);
};