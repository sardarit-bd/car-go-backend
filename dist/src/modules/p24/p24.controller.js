import sendResponse from "../../shared/utils/response.js";
import * as p24Service from "./p24.service.js";
export const createTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await p24Service.createP24Transaction(id);
        sendResponse(res, 200, true, "P24 transaction created", result);
    }
    catch (error) {
        next(error);
    }
};
export const webhook = async (req, res, next) => {
    try {
        await p24Service.handleP24Notification(req.body);
        res.status(200).send("OK");
    }
    catch (error) {
        next(error);
    }
};
