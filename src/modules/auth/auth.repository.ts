import { prisma } from "../../../lib/prisma.js";
import { Role } from "../../../generated/prisma/enums.js";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findFirst({
    where: { email, deletedAt: null },
  });
};

export const createUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: Role;
}) => {
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

export const findUserById = async (id: string) => {
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

export const updateUser = async (id: string, data: any) => {
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

export const saveResetToken = async (email: string, token: string, expiry: Date) => {
  return prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetTokenExpiry: expiry,
    },
  });
};

export const findUserByResetToken = async (token: string) => {
  return prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
      deletedAt: null,
    },
  });
};