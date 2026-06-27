import { Router } from "express";
import { getVehicles } from "./vehicle.controller";
import validate from "../../shared/middleware/validate";
import { getVehiclesQuerySchema } from "./vehicle.validator";

const router = Router();

router.get("/", validate(getVehiclesQuerySchema, "query"), getVehicles);

export default router;