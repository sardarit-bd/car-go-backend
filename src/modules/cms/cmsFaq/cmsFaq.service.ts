import * as cmsFaqRepository from "./cmsFaq.repository.js";
import AppError from "../../../shared/utils/AppError.js";

export const createCmsFaqService = async (data: any) => {
  return cmsFaqRepository.createCmsFaq(data);
};

export const getAllCmsFaqsService = async (page: number = 1, limit: number = 10) => {
  return cmsFaqRepository.findAllCmsFaqs(page, limit);
};

export const getCmsFaqByIdService = async (id: string) => {
  const faq = await cmsFaqRepository.findCmsFaqById(id);
  if (!faq) {
    throw new AppError("FAQ not found", 404);
  }
  return faq;
};

export const updateCmsFaqService = async (id: string, data: any) => {
  const faq = await cmsFaqRepository.findCmsFaqById(id);
  if (!faq) {
    throw new AppError("FAQ not found", 404);
  }
  return cmsFaqRepository.updateCmsFaq(id, data);
};

export const deleteCmsFaqService = async (id: string) => {
  const faq = await cmsFaqRepository.findCmsFaqById(id);
  if (!faq) {
    throw new AppError("FAQ not found", 404);
  }
  return cmsFaqRepository.softDeleteCmsFaq(id);
};