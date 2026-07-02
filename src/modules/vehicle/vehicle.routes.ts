import { Router } from "express";
import { 
  getVehicles, 
  getVehicleById, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle 
} from "./vehicle.controller";
import validate from "../../shared/middleware/validate";
import { 
  getVehiclesQuerySchema, 
  vehicleIdParamsSchema,  
  createVehicleBodySchema, 
  updateVehicleBodySchema 
} from "./vehicle.validator";
import upload from "../../shared/utils/upload";
const router = Router();

router.get("/", validate(getVehiclesQuerySchema, "query"), getVehicles);
router.get("/:id", validate(vehicleIdParamsSchema, "params"), getVehicleById);

router.post(
  "/",
  upload.array("images", 10), 
  validate(createVehicleBodySchema, "body"),
  createVehicle,
);

router.patch(
  "/:id",
  validate(vehicleIdParamsSchema, "params"),
  upload.array("images", 10), 
  validate(updateVehicleBodySchema, "body"),
  updateVehicle,
);

router.delete(
  "/:id",
  validate(vehicleIdParamsSchema, "params"),
  deleteVehicle,
);
export default router;