import * as contactRepository from "./contact.repository";
import AppError from "../../shared/utils/AppError";

// Helper to verify Google reCAPTCHA token
const verifyCaptcha = async (token?: string) => {
  if (!token) return true; // Skip if frontend doesn't send a token
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) return true; // Skip if you haven't configured the secret key in .env yet

  try {
    // Using native fetch (available in Node 18+)
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
      method: 'POST',
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    return false;
  }
};

export const createContactService = async (data: any) => {
  // 1. Verify CAPTCHA
  const isHuman = await verifyCaptcha(data.captchaToken);
  if (!isHuman) {
    throw new AppError("CAPTCHA verification failed. Please try again.", 400);
  }

  // 2. Clean data (remove token before saving to DB)
  const { captchaToken, ...contactData } = data;

  // 3. Save to database
  return contactRepository.createContact(contactData);
};

export const getAllContactsService = async (page: number = 1, limit: number = 10, search?: string, status?: string) => {
  return contactRepository.getAllContacts(page, limit, search, status);
};

export const updateContactStatusService = async (id: string, status: string) => {
  const contact = await contactRepository.findContactById(id);
  if (!contact) throw new AppError("Contact message not found", 404);

  return contactRepository.updateContactStatus(id, status);
};