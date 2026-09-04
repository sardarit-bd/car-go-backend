import { Request, Response, NextFunction } from "express";
import sendResponse from "../../shared/utils/response.js";
import * as p24Service from "./p24.service.js";

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params as { id: string };
    const origin = req.get("origin");
    const result = await p24Service.createP24Transaction(id, origin);
    sendResponse(res, 200, true, "P24 transaction created", result);
  } catch (error) {
    next(error);
  }
};

export const webhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await p24Service.handleP24Notification(req.body);
    res.status(200).send("OK");
  } catch (error) {
    next(error);
  }
};
