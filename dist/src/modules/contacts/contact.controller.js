import * as contactService from "./contact.service.js";
import sendResponse from "../../shared/utils/response.js";
import AppError from "../../shared/utils/AppError.js";
export const createContact = async (req, res, next) => {
    try {
        const contact = await contactService.createContactService(req.body);
        sendResponse(res, 201, true, "Message sent successfully. We will get back to you soon.", contact);
    }
    catch (error) {
        next(error);
    }
};
export const getAllContacts = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "ADMIN") {
            throw new AppError("Forbidden: Admin access required", 403);
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        const status = req.query.status;
        const validStatuses = ["PENDING", "IN_PROGRESS", "SOLVED", "CLOSED"];
        if (status && !validStatuses.includes(status)) {
            throw new AppError(`Invalid status filter. Must be one of: ${validStatuses.join(", ")}`, 400);
        }
        const result = await contactService.getAllContactsService(page, limit, search, status);
        sendResponse(res, 200, true, "Contact messages fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const updateContactStatus = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "ADMIN") {
            throw new AppError("Forbidden: Admin access required", 403);
        }
        const contact = await contactService.updateContactStatusService(req.params.id, req.body.status);
        sendResponse(res, 200, true, "Contact status updated successfully", contact);
    }
    catch (error) {
        next(error);
    }
};
