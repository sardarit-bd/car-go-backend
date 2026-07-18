import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../../../lib/prisma.js";
import { Role } from "../../../generated/prisma/enums.js";
import * as authRepository from "./auth.repository.js";
import AppError from "../../shared/utils/AppError.js";
export const register = async (data) => {
    const existingUser = await authRepository.findUserByEmail(data.email);
    if (existingUser) {
        throw new AppError("Email already registered", 409);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? Role.ADMIN : Role.USER;
    const { confirmPassword, ...userData } = data;
    const user = await authRepository.createUser({
        ...userData,
        password: hashedPassword,
        role,
    });
    const token = generateToken(user.id, user.role);
    return { user, token };
};
export const login = async (data) => {
    const user = await authRepository.findUserByEmail(data.email);
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
    if (!user.password) {
        throw new AppError("Password is not set", 400);
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new AppError("Invalid email or password", 401);
    }
    const token = generateToken(user.id, user.role);
    return {
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        },
        token,
    };
};
export const forgotPassword = async (email) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw new AppError("User with this email does not exist", 404);
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await authRepository.saveResetToken(email, resetToken, resetTokenExpiry);
    // In production, this link would be sent via email.
    const resetLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;
    return { resetLink, resetToken }; // Returning token for easy Postman testing
};
export const resetPassword = async (token, newPassword) => {
    const user = await authRepository.findUserByResetToken(token);
    if (!user) {
        throw new AppError("Invalid or expired reset token", 400);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await authRepository.updateUser(user.id, {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
    });
};
export const getProfile = async (userId) => {
    const user = await authRepository.findUserById(userId);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    return user;
};
export const updateProfile = async (userId, data) => {
    const fullUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, password: true, email: true },
    });
    if (!fullUser) {
        throw new AppError("User not found", 404);
    }
    const updateData = { ...data };
    if (data.password) {
        if (!data.currentPassword) {
            throw new AppError("Current password is required to set a new password", 400);
        }
        if (!fullUser.password) {
            throw new AppError("Password is not set for this account", 400);
        }
        const isMatch = await bcrypt.compare(data.currentPassword, fullUser.password);
        if (!isMatch) {
            throw new AppError("Current password is incorrect", 401);
        }
        updateData.password = await bcrypt.hash(data.password, 10);
    }
    else {
        delete updateData.password;
    }
    delete updateData.currentPassword;
    delete updateData.confirmPassword;
    if (data.email && data.email !== fullUser.email) {
        const existingUser = await authRepository.findUserByEmail(data.email);
        if (existingUser) {
            throw new AppError("Email already in use", 409);
        }
    }
    return authRepository.updateUser(userId, updateData);
};
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
export const activateAccount = async (data) => {
    const user = await authRepository.findUserByEmail(data.email);
    if (!user) {
        throw new AppError("Invalid activation link or user not found", 400);
    }
    if (!user.activationToken ||
        user.activationToken !== data.token ||
        !user.activationTokenExpiry ||
        user.activationTokenExpiry < new Date()) {
        throw new AppError("Activation token is invalid or has expired", 400);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const updatedUser = await authRepository.updateUser(user.id, {
        password: hashedPassword,
        activationToken: null,
        activationTokenExpiry: null,
    });
    const token = generateToken(updatedUser.id, updatedUser.role);
    return {
        user: {
            id: updatedUser.id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role,
        },
        token,
    };
};
export const changePassword = async (userId, payload) => {
    const { currentPassword, newPassword } = payload;
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    if (!user.password) {
        throw new AppError("Password is not set for this account", 400);
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new AppError("Current password is incorrect", 400);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: userId },
        data: {
            password: hashedPassword,
        },
    });
    return {
        message: "Password changed successfully",
    };
};
