import { Request, Response, NextFunction } from "express";
import sendResponse from "../../shared/utils/response.js";
import { getAvailableVehicles } from "./vehicle.service.js";
import { GetVehiclesQuery } from "./vehicle.validator.js";
import * as vehicleService from "./vehicle.service.js";
export const getVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query = req.query as unknown as GetVehiclesQuery;

    const result = await getAvailableVehicles(query);

    sendResponse(res, 200, true, "Vehicles fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

export const getVehicleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const result = await vehicleService.getVehicleById(id);
    sendResponse(res, 200, true, "Vehicle fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

export const createVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const result = await vehicleService.createVehicle(req.body, files);
    sendResponse(res, 201, true, "Vehicle created successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    const files = req.files as Express.Multer.File[] | undefined;
    const result = await vehicleService.updateVehicle(id, req.body, files);
    sendResponse(res, 200, true, "Vehicle updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const deleteVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    await vehicleService.deleteVehicle(id);
    sendResponse(res, 200, true, "Vehicle deleted successfully", null);
  } catch (error) {
    next(error);
  }
};
