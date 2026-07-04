import { prisma } from "../../../lib/prisma";
export const reviewRepository = {
    create: (data) => {
        return prisma.review.create({ data });
    },
    findApproved: (page, limit) => {
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
    findAllForAdmin: (page, limit, status) => {
        const where = { deletedAt: null };
        if (status)
            where.status = status;
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
    updateStatus: (id, status) => {
        return prisma.review.update({
            where: { id },
            data: { status },
        });
    },
    softDelete: (id) => {
        return prisma.review.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    },
    findById: (id) => {
        return prisma.review.findFirst({
            where: { id, deletedAt: null }
        });
    },
    countApproved: () => {
        return prisma.review.count({ where: { status: "APPROVED", deletedAt: null } });
    },
    countAllForAdmin: (status) => {
        const where = { deletedAt: null };
        if (status)
            where.status = status;
        return prisma.review.count({ where });
    }
};
