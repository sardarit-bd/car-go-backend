import * as vehicleRepository from "./vehicle.repository.js";
import AppError from "../../shared/utils/AppError.js";
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const startOfDay = (date) => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
};
const addDays = (date, days) => new Date(date.getTime() + days * MS_IN_DAY);
const resolveSearchDates = (pickupDate, returnDate) => {
    const effectivePickup = pickupDate
        ? startOfDay(pickupDate)
        : addDays(startOfDay(new Date()), 1);
    const effectiveReturn = returnDate
        ? startOfDay(returnDate)
        : addDays(effectivePickup, 2);
    return { pickupDate: effectivePickup, returnDate: effectiveReturn };
};
export const getAvailableVehicles = async (query) => {
    const { model, seats, location, pickupDate, returnDate, includeInactive } = query;
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const { pickupDate: effectivePickup, returnDate: effectiveReturn } = resolveSearchDates(pickupDate, returnDate);
    const skip = (page - 1) * limit;
    const filters = {
        model,
        seats,
        location,
        pickupDate: effectivePickup,
        returnDate: effectiveReturn,
        includeInactive,
    };
    const [vehicles, total] = await Promise.all([
        vehicleRepository.findAvailableVehicles(filters, { skip, take: limit }),
        vehicleRepository.countAvailableVehicles(filters),
    ]);
    return {
        vehicles,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
export const getVehicleById = async (id) => {
    const vehicle = await vehicleRepository.findVehicleById(id);
    if (!vehicle) {
        throw new AppError("Vehicle not found", 404);
    }
    return vehicle;
};
const buildImagesPayload = (files) => {
    const images = [];
    if (files?.mainImage?.[0]) {
        images.push({
            imageUrl: `/uploads/${files.mainImage[0].filename}`,
            isPrimary: true,
        });
    }
    if (files?.galleryImages?.length) {
        for (const file of files.galleryImages) {
            images.push({ imageUrl: `/uploads/${file.filename}`, isPrimary: false });
        }
    }
    return images;
};
export const createVehicle = async (data, files) => {
    const images = buildImagesPayload(files);
    const payload = {
        ...data,
        images,
    };
    return vehicleRepository.createVehicle(payload);
};
export const updateVehicle = async (id, data, files) => {
    const vehicle = await vehicleRepository.findVehicleByIdAdmin(id);
    if (!vehicle) {
        throw new AppError("Vehicle not found", 404);
    }
    const newImages = buildImagesPayload(files);
    if (newImages.length > 0) {
        data.images = newImages;
    }
    return vehicleRepository.updateVehicle(id, data);
};
export const deleteVehicle = async (id) => {
    const vehicle = await vehicleRepository.findVehicleByIdAdmin(id);
    if (!vehicle) {
        throw new AppError("Vehicle not found", 404);
    }
    await vehicleRepository.softDeleteVehicle(id);
};
