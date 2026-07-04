import * as cmsHeroRepository from "./cmsHero.repository";
import AppError from "../../../shared/utils/AppError";

export const createCmsHeroService = async (data: any) => {
  return cmsHeroRepository.createCmsHero(data);
};

export const getCmsHeroService = async () => {
  const hero = await cmsHeroRepository.findCmsHero();
  if (!hero) {
    throw new AppError("Hero section not found", 404);
  }
  return hero;
};

export const getCmsHeroByIdService = async (id: string) => {
  const hero = await cmsHeroRepository.findCmsHeroById(id);
if (!hero) {
    throw new AppError("Hero section not found", 404);
  }
  return hero;
};

export const updateCmsHeroService = async (id: string, data: any) => {
  const hero = await cmsHeroRepository.findCmsHeroById(id);
  if (!hero) {
    throw new AppError("Hero section not found", 404);
  }
  return cmsHeroRepository.updateCmsHero(id, data);
};

export const deleteCmsHeroService = async (id: string) => {
  const hero = await cmsHeroRepository.findCmsHeroById(id);
  if (!hero) {
    throw new AppError("Hero section not found", 404);
  }
  return cmsHeroRepository.softDeleteCmsHero(id);
};