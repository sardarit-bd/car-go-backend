import { prisma } from "../../../lib/prisma.js";

export const reviewRepository = {
  create: (data: { userId: string; rating: number; comment: string }) => {
    return prisma.review.create({ data });
  },
  
  findApproved: (page: number, limit: number) => {
    return prisma.review.findMany({
      where: { status: "APPROVED", deletedAt: null },
      include: { 
        user: { 
          select: { 
            id: true, 
            firstName: true, 
            lastName: true, 
            email: true 
          } 
        } 
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });
  },
  
  findAllForAdmin: (page: number, limit: number, status?: string) => {
    const where: any = { deletedAt: null };
    if (status) where.status = status;
    
    return prisma.review.findMany({
      where,
      include: { 
        user: { 
          select: { 
            id: true, 
            firstName: true, 
            lastName: true, 
            email: true 
          } 
        } 
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });
  },
  
  updateStatus: (id: string, status: "APPROVED" | "REJECTED") => {
    return prisma.review.update({
      where: { id },
      data: { status },
    });
  },
  
  softDelete: (id: string) => {
    return prisma.review.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },
  
  findById: (id: string) => {
    return prisma.review.findFirst({ 
      where: { id, deletedAt: null } 
    });
  },
  
  countApproved: () => {
    return prisma.review.count({ where: { status: "APPROVED", deletedAt: null } });
  },
  
  countAllForAdmin: (status?: string) => {
    const where: any = { deletedAt: null };
    if (status) where.status = status;
    return prisma.review.count({ where });
  }
};