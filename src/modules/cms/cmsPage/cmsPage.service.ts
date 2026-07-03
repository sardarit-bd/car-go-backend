import * as cmsPageRepository from "./cmsPage.repository";
import AppError from "../../../shared/utils/AppError";

export const createCmsPageService = async (data: any) => {
  return cmsPageRepository.createCmsPage(data);
};

export const getAllCmsPagesService = async () => {
  return cmsPageRepository.findAllCmsPages();
};

export const getCmsPageByIdService = async (id: string) => {
  const page = await cmsPageRepository.findCmsPageById(id);
  if (!page) {
    throw new AppError("Page not found", 404);
  }
  return page;
};

export const getCmsPageByTypeService = async (type: string) => {
  const page = await cmsPageRepository.findCmsPageByType(type);
  if (!page) {
    throw new AppError("Page not found", 404);
  }
  return page;
};

export const updateCmsPageService = async (id: string, data: any) => {
  const page = await cmsPageRepository.findCmsPageById(id);
  if (!page) {
    throw new AppError("Page not found", 404);
  }
  return cmsPageRepository.updateCmsPage(id, data);
};

export const deleteCmsPageService = async (id: string) => {
  const page = await cmsPageRepository.findCmsPageById(id);
  if (!page) {
    throw new AppError("Page not found", 404);
  }
  return cmsPageRepository.softDeleteCmsPage(id);
};