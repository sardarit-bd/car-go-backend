import {prisma}  from "../../../../lib/prisma";



export const createCmsContact = async (data: any) => {
  return prisma.cmsContact.upsert({
    where: { type: data.type },
    update: data,
    create: data,
  });
};

export const findAllCmsContacts = async () => {
  return prisma.cmsContact.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
};

export const findCmsContactById = async (id: string) => {
  return prisma.cmsContact.findUnique({
    where: { id, deletedAt: null },
  });
};

export const findCmsContactByType = async (type: string) => {
  return prisma.cmsContact.findUnique({
    where: { type, deletedAt: null },
  });
};

export const updateCmsContact = async (id: string, data: any) => {
  return prisma.cmsContact.update({
    where: { id },
    data,
  });
};

export const softDeleteCmsContact = async (id: string) => {
  return prisma.cmsContact.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};