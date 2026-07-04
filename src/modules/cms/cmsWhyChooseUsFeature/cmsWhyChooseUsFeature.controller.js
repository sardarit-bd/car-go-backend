import * as cmsWhyChooseUsFeatureService from "./cmsWhyChooseUsFeature.service";
import successResponse from "../../../shared/utils/response";
export const createCmsWhyChooseUsFeature = async (req, res, next) => {
    try {
        const feature = await cmsWhyChooseUsFeatureService.createCmsWhyChooseUsFeatureService(req.body);
        return successResponse(res, 201, true, "Why Choose Us feature created successfully", feature);
    }
    catch (error) {
        next(error);
    }
};
export const getAllCmsWhyChooseUsFeatures = async (req, res, next) => {
    try {
        const features = await cmsWhyChooseUsFeatureService.getAllCmsWhyChooseUsFeaturesService();
        return successResponse(res, 200, true, "Why Choose Us features retrieved successfully", features);
    }
    catch (error) {
        next(error);
    }
};
export const getCmsWhyChooseUsFeatureById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const feature = await cmsWhyChooseUsFeatureService.getCmsWhyChooseUsFeatureByIdService(id);
        return successResponse(res, 200, true, "Why Choose Us feature retrieved successfully", feature);
    }
    catch (error) {
        next(error);
    }
};
export const updateCmsWhyChooseUsFeature = async (req, res, next) => {
    try {
        const { id } = req.params;
        const feature = await cmsWhyChooseUsFeatureService.updateCmsWhyChooseUsFeatureService(id, req.body);
        return successResponse(res, 200, true, "Why Choose Us feature updated successfully", feature);
    }
    catch (error) {
        next(error);
    }
};
export const deleteCmsWhyChooseUsFeature = async (req, res, next) => {
    try {
        const { id } = req.params;
        await cmsWhyChooseUsFeatureService.deleteCmsWhyChooseUsFeatureService(id);
        return successResponse(res, 200, true, "Why Choose Us feature deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
