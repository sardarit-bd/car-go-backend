import * as cmsSocialMediaRepository from "./cmsSocialMedia.repository.js";
import AppError from "../../../shared/utils/AppError.js";

export const createCmsSocialMediaService = async (data: any) => {
  return cmsSocialMediaRepository.createCmsSocialMedia(data);
};

export const getAllCmsSocialMediaService = async () => {
  return cmsSocialMediaRepository.findAllCmsSocialMedia();
};

export const getCmsSocialMediaByIdService = async (id: string) => {
  const socialMedia = await cmsSocialMediaRepository.findCmsSocialMediaById(id);
  if (!socialMedia) {
    throw new AppError("Social media link not found", 404);
  }
  return socialMedia;
};

export const updateCmsSocialMediaService = async (id: string, data: any) => {
  const socialMedia = await cmsSocialMediaRepository.findCmsSocialMediaById(id);
  if (!socialMedia) {
    throw new AppError("Social media link not found", 404);
  }
  return cmsSocialMediaRepository.updateCmsSocialMedia(id, data);
};

export const deleteCmsSocialMediaService = async (id: string) => {
  const socialMedia = await cmsSocialMediaRepository.findCmsSocialMediaById(id);
  if (!socialMedia) {
    throw new AppError("Social media link not found", 404);
  }
  return cmsSocialMediaRepository.softDeleteCmsSocialMedia(id);
};