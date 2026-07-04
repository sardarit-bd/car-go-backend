import { ValidationError } from "yup";
import AppError from "../utils/AppError";
const validate = (schema, source = "body") => async (req, res, next) => {
    try {
        const validated = await schema.validate(req[source], {
            abortEarly: false,
            stripUnknown: true,
        });
        if (source === "query") {
            Object.defineProperty(req, "query", {
                value: validated,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        }
        else if (source === "params") {
            Object.defineProperty(req, "params", {
                value: validated,
                writable: true,
                enumerable: true,
                configurable: true,
            });
        }
        else {
            req.body = validated;
        }
        next();
    }
    catch (error) {
        if (error instanceof ValidationError) {
            const message = error.errors.join(", ");
            next(new AppError(message, 400));
            return;
        }
        console.error("Unexpected error inside validate middleware:", error);
        next(error);
    }
};
export default validate;
