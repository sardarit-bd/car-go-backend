import {prisma}  from "../../../../lib/prisma.js";



export const createCmsFaq = async (data: any) => {
  return prisma.cmsFaq.create({ data });
};

export const findAllCmsFaqs = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  
  const [faqs, total] = await Promise.all([
    prisma.cmsFaq.findMany({
      skip,
      take: limit,
      orderBy: { order: "asc" },
      where: { deletedAt: null },
    }),
    prisma.cmsFaq.count({
      where: { deletedAt: null },
    }),
  ]);

  return {
    data: faqs,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const findCmsFaqById = async (id: string) => {
  return prisma.cmsFaq.findUnique({
    where: { id, deletedAt: null },
  });
};

export const updateCmsFaq = async (id: string, data: any) => {
  return prisma.cmsFaq.update({
    where: { id },
    data,
  });
};

export const softDeleteCmsFaq = async (id: string) => {
  return prisma.cmsFaq.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export const deleteAllCmsFaqs = async () => {
  return prisma.cmsFaq.deleteMany();
};