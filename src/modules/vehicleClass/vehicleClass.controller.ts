import { Request, Response, NextFunction } from "express";
import sendResponse from "../../shared/utils/response.js";
import * as vehicleClassService from "./vehicleClass.service.js";

export const getVehicleClasses = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await vehicleClassService.getAllVehicleClasses();
    sendResponse(
      res,
      200,
      true,
      "Vehicle classes fetched successfully",
      result,
    );
  } catch (error) {
    next(error);
  }
};

export const createVehicleClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await vehicleClassService.createVehicleClass(req.body);
    sendResponse(res, 201, true, "Vehicle class created successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateVehicleClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const result = await vehicleClassService.updateVehicleClass(id, req.body);
    sendResponse(res, 200, true, "Vehicle class updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const deleteVehicleClass = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    await vehicleClassService.deleteVehicleClass(id);
    sendResponse(res, 200, true, "Vehicle class deleted successfully", null);
  } catch (error) {
    next(error);
  }
};
