import { Request, Response, NextFunction } from "express";
import * as cmsSocialMediaService from "./cmsSocialMedia.service";
import sendResponse from "../../../shared/utils/response";

export const createCmsSocialMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const socialMedia = await cmsSocialMediaService.createCmsSocialMediaService(req.body);
    return sendResponse(res, 201, true, "Social media link created successfully", socialMedia);
  } catch (error) {
    next(error);
  }
};

export const getAllCmsSocialMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const socialMedia = await cmsSocialMediaService.getAllCmsSocialMediaService();
    return sendResponse(res, 200, true, "Social media links retrieved successfully", socialMedia);
  } catch (error) {
    next(error);
  }
};

export const getCmsSocialMediaById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const socialMedia = await cmsSocialMediaService.getCmsSocialMediaByIdService(id);
    return sendResponse(res, 200, true, "Social media link retrieved successfully", socialMedia);
  } catch (error) {
    next(error);
  }
};

export const updateCmsSocialMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const socialMedia = await cmsSocialMediaService.updateCmsSocialMediaService(id, req.body);
    return sendResponse(res, 200, true, "Social media link updated successfully", socialMedia);
  } catch (error) {
    next(error);
  }
};

export const deleteCmsSocialMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await cmsSocialMediaService.deleteCmsSocialMediaService(id);
    return sendResponse(res, 200, true, "Social media link deleted successfully", null);
  } catch (error) {
    next(error);
  }
};