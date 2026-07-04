import { Request, Response, NextFunction } from "express";
import * as cmsWhyChooseUsService from "./cmsWhyChooseUs.service";
import sendResponse from "../../../shared/utils/response";

export const createCmsWhyChooseUs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // If an image was uploaded, set the mainImage path in req.body
    if (req.file) {
      req.body.mainImage = `/uploads/${req.file.filename}`;
    }
    const section = await cmsWhyChooseUsService.createCmsWhyChooseUsService(
      req.body,
    );
    return sendResponse(
      res,
      201,
      true,
      "Why Choose Us section created/updated successfully",
      section,
    );
  } catch (error) {
    next(error);
  }
};

export const getCmsWhyChooseUs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const section = await cmsWhyChooseUsService.getCmsWhyChooseUsService();
    return sendResponse(
      res,
      200,
      true,
      "Why Choose Us section retrieved successfully",
      section,
    );
  } catch (error) {
    next(error);
  }
};

export const getCmsWhyChooseUsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const section =
      await cmsWhyChooseUsService.getCmsWhyChooseUsByIdService(id);
    return sendResponse(
      res,
      200,
      true,
      "Why Choose Us section retrieved successfully",
      section,
    );
  } catch (error) {
    next(error);
  }
};

export const updateCmsWhyChooseUs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // If a new image was uploaded, update the mainImage path in req.body
    if (req.file) {
      req.body.mainImage = `/uploads/${req.file.filename}`;
    }
    const { id } = req.params as { id: string };
    const section = await cmsWhyChooseUsService.updateCmsWhyChooseUsService(
      id,
      req.body,
    );
    return sendResponse(
      res,
      200,
      true,
      "Why Choose Us section updated successfully",
      section,
    );
  } catch (error) {
    next(error);
  }
};

export const deleteCmsWhyChooseUs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    await cmsWhyChooseUsService.deleteCmsWhyChooseUsService(id);
    return sendResponse(
      res,
      200,
      true,
      "Why Choose Us section deleted successfully",
      null,
    );
  } catch (error) {
    next(error);
  }
};
