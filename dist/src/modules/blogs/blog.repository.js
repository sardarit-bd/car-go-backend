import { prisma } from "../../../lib/prisma.js";
export const createBlog = async (data) => {
    return prisma.blog.create({ data });
};
export const findBlogById = async (id) => {
    return prisma.blog.findFirst({
        where: { id, deletedAt: null },
        include: {
            author: { select: { id: true, firstName: true, lastName: true } },
        },
    });
};
export const findBlogBySlug = async (slug) => {
    return prisma.blog.findFirst({
        where: { slug, deletedAt: null },
        include: {
            author: { select: { id: true, firstName: true, lastName: true } },
        },
    });
};
export const getAllBlogs = async (page, limit, search) => {
    const skip = (page - 1) * limit;
    const where = {
        deletedAt: null,
        ...(search && {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                { content: { contains: search, mode: "insensitive" } },
            ],
        }),
    };
    const [data, total] = await Promise.all([
        prisma.blog.findMany({
            where,
            skip,
            take: limit,
            orderBy: { date: "desc" },
            include: {
                author: { select: { id: true, firstName: true, lastName: true } },
            },
        }),
        prisma.blog.count({ where }),
    ]);
    return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};
export const updateBlog = async (id, data) => {
    return prisma.blog.update({ where: { id }, data });
};
export const deleteBlog = async (id) => {
    return prisma.blog.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
