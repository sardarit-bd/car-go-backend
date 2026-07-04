import { prisma } from "../../../lib/prisma";
export const createContact = async (data) => {
    return prisma.contactMessage.create({ data });
};
export const findContactById = async (id) => {
    return prisma.contactMessage.findFirst({
        where: { id, deletedAt: null },
    });
};
export const getAllContacts = async (page, limit, search, status) => {
    const skip = (page - 1) * limit;
    const where = {
        deletedAt: null,
    };
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { message: { contains: search, mode: "insensitive" } },
        ];
    }
    if (status) {
        where.status = status;
    }
    const [data, total] = await Promise.all([
        prisma.contactMessage.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma.contactMessage.count({ where }),
    ]);
    return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};
export const updateContactStatus = async (id, status) => {
    return prisma.contactMessage.update({
        where: { id },
        data: { status: status },
    });
};
