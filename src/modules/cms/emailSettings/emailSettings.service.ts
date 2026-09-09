import { prisma } from "../../../../lib/prisma.js";
import AppError from "../../../shared/utils/AppError.js";

export const getEmailSettingsService = async () => {
  let settings = await prisma.emailSettings.findFirst();
  if (!settings) {
    settings = await prisma.emailSettings.create({
      data: {
        primaryColor: "#dc2626",
        companyPhone: "+48 459 111 828",
        companyEmail: "rezerwacje@car-go.pl",
        website: "www.car-go.pl",
        signature: "Z poważaniem,<br>Zespół CAR-GO",
      },
    });
  }
  return settings;
};

export const updateEmailSettingsService = async (data: any) => {
  const existing = await prisma.emailSettings.findFirst();
  if (existing) {
    return prisma.emailSettings.update({
      where: { id: existing.id },
      data,
    });
  }
  
  return prisma.emailSettings.create({ data });
};