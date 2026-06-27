import { Request, Response, NextFunction } from "express";
import sendResponse from "../../shared/utils/response";
import * as packageService from "./package.service";

export const getPackages = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await packageService.getAllPackages();
    sendResponse(res, 200, true, "Packages fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

export const createPackage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await packageService.createPackage(req.body);
    sendResponse(res, 201, true, "Package created successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updatePackage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await packageService.updatePackage(id, req.body);
    sendResponse(res, 200, true, "Package updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const deletePackage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    await packageService.deletePackage(id);
    sendResponse(res, 200, true, "Package deleted successfully", null);
  } catch (error) {
    next(error);
  }
};