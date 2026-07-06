import { Request, Response, NextFunction } from "express";
import * as cmsWhyChooseUsFeatureService from "./cmsWhyChooseUsFeature.service.js";
import successResponse from "../../../shared/utils/response.js";

export const createCmsWhyChooseUsFeature = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const feature =
      await cmsWhyChooseUsFeatureService.createCmsWhyChooseUsFeatureService(
        req.body,
      );
    return successResponse(
      res,
      201,
      true,
      "Why Choose Us feature created successfully",
      feature,
    );
  } catch (error) {
    next(error);
  }
};

export const getAllCmsWhyChooseUsFeatures = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const features =
      await cmsWhyChooseUsFeatureService.getAllCmsWhyChooseUsFeaturesService();
    return successResponse(
      res,
      200,
      true,
      "Why Choose Us features retrieved successfully",
      features,
    );
  } catch (error) {
    next(error);
  }
};

export const getCmsWhyChooseUsFeatureById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const feature =
      await cmsWhyChooseUsFeatureService.getCmsWhyChooseUsFeatureByIdService(
        id,
      );
    return successResponse(
      res,
      200,
      true,
      "Why Choose Us feature retrieved successfully",
      feature,
    );
  } catch (error) {
    next(error);
  }
};

export const updateCmsWhyChooseUsFeature = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const feature =
      await cmsWhyChooseUsFeatureService.updateCmsWhyChooseUsFeatureService(
        id,
        req.body,
      );
    return successResponse(
      res,
      200,
      true,
      "Why Choose Us feature updated successfully",
      feature,
    );
  } catch (error) {
    next(error);
  }
};

export const deleteCmsWhyChooseUsFeature = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    await cmsWhyChooseUsFeatureService.deleteCmsWhyChooseUsFeatureService(id);
    return successResponse(
      res,
      200,
      true,
      "Why Choose Us feature deleted successfully",
      null,
    );
  } catch (error) {
    next(error);
  }
};
