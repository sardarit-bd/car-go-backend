import { Request, Response, NextFunction } from "express";
import sendResponse from "../../shared/utils/response";
import { getAvailableVehicles } from "./vehicle.service";
import { GetVehiclesQuery } from "./vehicle.validator";

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