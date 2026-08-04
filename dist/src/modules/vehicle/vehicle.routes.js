import { Router } from "express";
import { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle, } from "./vehicle.controller.js";
import validate from "../../shared/middleware/validate.js";
import { getVehiclesQuerySchema, vehicleIdParamsSchema, createVehicleBodySchema, updateVehicleBodySchema, } from "./vehicle.validator.js";
import upload from "../../shared/utils/upload.js";
const router = Router();
router.get("/", validate(getVehiclesQuerySchema, "query"), getVehicles);
router.get("/:id", validate(vehicleIdParamsSchema, "params"), getVehicleById);
const vehicleImageUpload = upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 5 },
]);
router.post("/", vehicleImageUpload, validate(createVehicleBodySchema, "body"), createVehicle);
router.patch("/:id", validate(vehicleIdParamsSchema, "params"), vehicleImageUpload, validate(updateVehicleBodySchema, "body"), updateVehicle);
router.delete("/:id", validate(vehicleIdParamsSchema, "params"), deleteVehicle);
export default router;
