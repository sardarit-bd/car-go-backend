import { Request, Response, NextFunction } from "express";
import { AnySchema, ValidationError } from "yup";
import AppError from "../utils/AppError";

const validate =
  (schema: AnySchema, source: "body" | "query" = "body") =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validated = await schema.validate(req[source], {
        abortEarly: false,
        stripUnknown: true,
      });

      if (source === "query") {
        // Express 5 makes req.query a getter-only property on the
        // prototype (no setter), so direct assignment throws.
        // defineProperty creates an own property on this instance that
        // shadows the prototype getter instead of triggering it.
        Object.defineProperty(req, "query", {
          value: validated,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        req.body = validated;
      }

      next();
    } catch (error: any) {
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