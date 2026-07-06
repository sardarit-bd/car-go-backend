import * as addonRepository from "./addon.repository.js";
import AppError from "../../shared/utils/AppError.js";
export const getAllAddons = async () => {
    return addonRepository.findAllAddons();
};
export const getAddonById = async (id) => {
    const addon = await addonRepository.findAddonById(id);
    if (!addon) {
        throw new AppError("Addon not found", 404);
    }
    return addon;
};
export const createAddon = async (data) => {
    return addonRepository.createAddon(data);
};
export const updateAddon = async (id, data) => {
    const addon = await addonRepository.findAddonById(id);
    if (!addon) {
        throw new AppError("Addon not found", 404);
    }
    return addonRepository.updateAddon(id, data);
};
export const deleteAddon = async (id) => {
    const addon = await addonRepository.findAddonById(id);
    if (!addon) {
        throw new AppError("Addon not found", 404);
    }
    await addonRepository.softDeleteAddon(id);
};
