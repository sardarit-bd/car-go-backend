import * as packageRepository from "./package.repository.js";
import AppError from "../../shared/utils/AppError.js";
import { CreatePackageBody, UpdatePackageBody } from "./package.validator.js";

export const getAllPackages = async () => {
  return packageRepository.findAllPackages();
};

export const getPackageById = async (id: string) => {
  const pkg = await packageRepository.findPackageById(id);
  if (!pkg) {
    throw new AppError("Package not found", 404);
  }
  return pkg;
};

export const createPackage = async (data: CreatePackageBody) => {
  return packageRepository.createPackage(data);
};

export const updatePackage = async (id: string, data: UpdatePackageBody) => {
  const pkg = await packageRepository.findPackageById(id);
  if (!pkg) {
    throw new AppError("Package not found", 404);
  }
  return packageRepository.updatePackage(id, data);
};

export const deletePackage = async (id: string) => {
  const pkg = await packageRepository.findPackageById(id);
  if (!pkg) {
    throw new AppError("Package not found", 404);
  }
  await packageRepository.softDeletePackage(id);
};