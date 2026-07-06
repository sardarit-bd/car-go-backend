import {prisma}  from "../../../../lib/prisma.js";



export const createCmsHero = async (data: any) => {
  // Only one hero section should exist
  const existing = await prisma.cmsHero.findFirst({
    where: { deletedAt: null },
  });

  if (existing) {
    return prisma.cmsHero.update({
      where: { id: existing.id },
      data,
    });
  }

  return prisma.cmsHero.create({ data });
};

export const findCmsHero = async () => {
  return prisma.cmsHero.findFirst({
    where: { deletedAt: null },
  });
};

export const findCmsHeroById = async (id: string) => {
  return prisma.cmsHero.findUnique({
    where: { id, deletedAt: null },
  });
};

export const updateCmsHero = async (id: string, data: any) => {
  return prisma.cmsHero.update({
    where: { id },
    data,
  });
};

export const softDeleteCmsHero = async (id: string) => {
  return prisma.cmsHero.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};  