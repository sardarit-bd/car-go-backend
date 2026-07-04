import { Request, Response, NextFunction } from "express";
import sendResponse from "../../shared/utils/response";
import * as locationService from "./location.service";

export const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await locationService.getAllLocations();
    sendResponse(res, 200, true, "Locations fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await locationService.createLocation(req.body);
    sendResponse(res, 201, true, "Location created successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const result = await locationService.updateLocation(id, req.body);
    sendResponse(res, 200, true, "Location updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    await locationService.deleteLocation(id);
    sendResponse(res, 200, true, "Location deleted successfully", null);
  } catch (error) {
    next(error);
  }
};
