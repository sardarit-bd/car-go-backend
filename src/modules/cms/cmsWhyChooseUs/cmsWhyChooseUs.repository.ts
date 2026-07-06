import {prisma}  from "../../../../lib/prisma.js";



export const createCmsWhyChooseUs = async (data: any) => {
  // Only one Why Choose Us section should exist
  const existing = await prisma.cmsWhyChooseUs.findFirst({
    where: { deletedAt: null },
  });

  if (existing) {
    return prisma.cmsWhyChooseUs.update({
      where: { id: existing.id },
      data,
    });
  }

  return prisma.cmsWhyChooseUs.create({ data });
};

export const findCmsWhyChooseUs = async () => {
  return prisma.cmsWhyChooseUs.findFirst({
    where: { deletedAt: null },
  });
};

export const findCmsWhyChooseUsById = async (id: string) => {
  return prisma.cmsWhyChooseUs.findUnique({
    where: { id, deletedAt: null },
  });
};

export const updateCmsWhyChooseUs = async (id: string, data: any) => {
  return prisma.cmsWhyChooseUs.update({
    where: { id },
    data,
  });
};

export const softDeleteCmsWhyChooseUs = async (id: string) => {
  return prisma.cmsWhyChooseUs.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};