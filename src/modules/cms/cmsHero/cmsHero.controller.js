import * as cmsHeroService from "./cmsHero.service";
import sendResponse from "../../../shared/utils/response";
export const createCmsHero = async (req, res, next) => {
    try {
        const hero = await cmsHeroService.createCmsHeroService(req.body);
        return sendResponse(res, 201, true, "Hero section created/updated successfully", hero);
    }
    catch (error) {
        next(error);
    }
};
export const getCmsHero = async (req, res, next) => {
    try {
        const hero = await cmsHeroService.getCmsHeroService();
        return sendResponse(res, 200, true, "Hero section retrieved successfully", hero);
    }
    catch (error) {
        next(error);
    }
};
export const getCmsHeroById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const hero = await cmsHeroService.getCmsHeroByIdService(id);
        return sendResponse(res, 200, true, "Hero section retrieved successfully", hero);
    }
    catch (error) {
        next(error);
    }
};
export const updateCmsHero = async (req, res, next) => {
    try {
        const { id } = req.params;
        const hero = await cmsHeroService.updateCmsHeroService(id, req.body);
        return sendResponse(res, 200, true, "Hero section updated successfully", hero);
    }
    catch (error) {
        next(error);
    }
};
export const deleteCmsHero = async (req, res, next) => {
    try {
        const { id } = req.params;
        await cmsHeroService.deleteCmsHeroService(id);
        return sendResponse(res, 200, true, "Hero section deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
