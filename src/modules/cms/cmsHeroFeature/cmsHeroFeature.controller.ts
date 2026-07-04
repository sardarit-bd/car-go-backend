import { Request, Response, NextFunction } from "express";
import * as cmsHeroFeatureService from "./cmsHeroFeature.service";
import sendResponse from "../../../shared/utils/response";

export const createCmsHeroFeature = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const feature = await cmsHeroFeatureService.createCmsHeroFeatureService(
      req.body,
    );
    return sendResponse(
      res,
      201,
      true,
      "Hero feature created successfully",
      feature,
    );
  } catch (error) {
    next(error);
  }
};

export const getAllCmsHeroFeatures = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const features = await cmsHeroFeatureService.getAllCmsHeroFeaturesService();
    return sendResponse(
      res,
      200,
      true,
      "Hero features retrieved successfully",
      features,
    );
  } catch (error) {
    next(error);
  }
};

export const getCmsHeroFeatureById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const feature =
      await cmsHeroFeatureService.getCmsHeroFeatureByIdService(id);
    return sendResponse(
      res,
      200,
      true,
      "Hero feature retrieved successfully",
      feature,
    );
  } catch (error) {
    next(error);
  }
};

export const updateCmsHeroFeature = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const feature = await cmsHeroFeatureService.updateCmsHeroFeatureService(
      id,
      req.body,
    );
    return sendResponse(
      res,
      200,
      true,
      "Hero feature updated successfully",
      feature,
    );
  } catch (error) {
    next(error);
  }
};

export const deleteCmsHeroFeature = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    await cmsHeroFeatureService.deleteCmsHeroFeatureService(id);
    return sendResponse(
      res,
      200,
      true,
      "Hero feature deleted successfully",
      null,
    );
  } catch (error) {
    next(error);
  }
};
