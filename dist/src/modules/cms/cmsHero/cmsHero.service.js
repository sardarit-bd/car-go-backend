import * as cmsHeroRepository from "./cmsHero.repository.js";
import AppError from "../../../shared/utils/AppError.js";
export const createCmsHeroService = async (data) => {
    return cmsHeroRepository.createCmsHero(data);
};
export const getCmsHeroService = async () => {
    const hero = await cmsHeroRepository.findCmsHero();
    if (!hero) {
        throw new AppError("Hero section not found", 404);
    }
    return hero;
};
export const getCmsHeroByIdService = async (id) => {
    const hero = await cmsHeroRepository.findCmsHeroById(id);
    if (!hero) {
        throw new AppError("Hero section not found", 404);
    }
    return hero;
};
export const updateCmsHeroService = async (id, data) => {
    const hero = await cmsHeroRepository.findCmsHeroById(id);
    if (!hero) {
        throw new AppError("Hero section not found", 404);
    }
    return cmsHeroRepository.updateCmsHero(id, data);
};
export const deleteCmsHeroService = async (id) => {
    const hero = await cmsHeroRepository.findCmsHeroById(id);
    if (!hero) {
        throw new AppError("Hero section not found", 404);
    }
    return cmsHeroRepository.softDeleteCmsHero(id);
};
