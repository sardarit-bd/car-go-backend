import { Request, Response, NextFunction } from "express";
import * as cmsFaqService from "./cmsFaq.service";
import sendResponse from "../../../shared/utils/response";
import AppError from "../../../shared/utils/AppError";

export const createCmsFaq = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const faq = await cmsFaqService.createCmsFaqService(req.body);
    return sendResponse(res, 201, true, "FAQ created successfully", faq);
  } catch (error) {
    next(error);
  }
};

export const getAllCmsFaqs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await cmsFaqService.getAllCmsFaqsService(page, limit);
    return sendResponse(
      res,
      200,
      true,
      "FAQs retrieved successfully",
      result.data,
      result.pagination,
    );
  } catch (error) {
    next(error);
  }
};

export const getCmsFaqById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const faq = await cmsFaqService.getCmsFaqByIdService(id);
    return sendResponse(res, 200, true, "FAQ retrieved successfully", faq);
  } catch (error) {
    next(error);
  }
};

export const updateCmsFaq = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const faq = await cmsFaqService.updateCmsFaqService(id, req.body);
    return sendResponse(res, 200, true, "FAQ updated successfully", faq);
  } catch (error) {
    next(error);
  }
};

export const deleteCmsFaq = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    await cmsFaqService.deleteCmsFaqService(id);
    // Pass the entire result object, which contains both data and pagination
    await cmsFaqService.deleteCmsFaqService(id);
    return sendResponse(res, 200, true, "FAQ deleted successfully", null);
  } catch (error) {
    next(error);
  }
};
