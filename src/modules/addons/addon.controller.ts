import { Request, Response, NextFunction } from "express";
import sendResponse from "../../shared/utils/response.js";
import * as addonService from "./addon.service.js";

export const getAddons = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await addonService.getAllAddons();
    console.log(result);
    sendResponse(res, 200, true, "Addons fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

export const createAddon = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.filename;
    }
    const result = await addonService.createAddon(data);
    sendResponse(res, 201, true, "Addon created successfully", result);
  } catch (error) {
    next(error);
  }
};

export const updateAddon = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    const data = { ...req.body };
    if (req.file) {
      data.image = req.file.filename;
    }
    const result = await addonService.updateAddon(id, data);
    sendResponse(res, 200, true, "Addon updated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const deleteAddon = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params as { id: string };
    await addonService.deleteAddon(id);
    sendResponse(res, 200, true, "Addon deleted successfully", null);
  } catch (error) {
    next(error);
  }
};
