import { prisma } from "../../../lib/prisma";
import { Role } from "../../../generated/prisma/enums";
export const findUserByEmail = async (email) => {
    return prisma.user.findFirst({
        where: { email, deletedAt: null },
    });
};
export const createUser = async (data) => {
    return prisma.user.create({
        data: {
            ...data,
            role: data.role || Role.USER,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
        },
    });
};
export const findUserById = async (id) => {
    return prisma.user.findFirst({
        where: { id, deletedAt: null },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            role: true,
        },
    });
};
export const updateUser = async (id, data) => {
    return prisma.user.update({
        where: { id },
        data,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            role: true,
        },
    });
};
export const saveResetToken = async (email, token, expiry) => {
    return prisma.user.update({
        where: { email },
        data: {
            resetToken: token,
            resetTokenExpiry: expiry,
        },
    });
};
export const findUserByResetToken = async (token) => {
    return prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpiry: { gt: new Date() },
            deletedAt: null,
        },
    });
};
