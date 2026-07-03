import { Request, Response, NextFunction } from "express";
import * as cmsContactService from "./cmsContact.service";
import successResponse from "../../../shared/utils/response";

export const createCmsContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contact = await cmsContactService.createCmsContactService(req.body);
    return successResponse(res, 201, true, "Contact created/updated successfully", contact);
  } catch (error) {
    next(error);
  }
};

export const getAllCmsContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await cmsContactService.getAllCmsContactsService();
    return successResponse(res, 200, true, "Contacts retrieved successfully", contacts);
  } catch (error) {
    next(error);
  }
};

export const getCmsContactById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const contact = await cmsContactService.getCmsContactByIdService(id);
    return successResponse(res, 200, true, "Contact retrieved successfully", contact);
  } catch (error) {
    next(error);
  }
};

export const getCmsContactByType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.params;
    const contact = await cmsContactService.getCmsContactByTypeService(type);
    return successResponse(res, 200, true, "Contact retrieved successfully", contact);
  } catch (error) {
    next(error);
  }
};

export const updateCmsContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const contact = await cmsContactService.updateCmsContactService(id, req.body);
    return successResponse(res, 200, true, "Contact updated successfully", contact);
  } catch (error) {
    next(error);
  }
};

export const deleteCmsContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await cmsContactService.deleteCmsContactService(id);
    return successResponse(res, 200, true, "Contact deleted successfully", null);
  } catch (error) {
    next(error);
  }
};