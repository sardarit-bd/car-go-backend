import crypto from "crypto";
import { prisma } from "../../../lib/prisma.js";
import { Role } from "../../../generated/prisma/enums.js";
import { sendActivationEmail } from "./emailService.js";
export const triggerGuestAccountActivation = async (params) => {
    const { email, firstName, lastName, phone } = params;
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser && existingUser.password) {
        await prisma.user.update({
            where: { id: existingUser.id },
            data: {
                firstName,
                lastName,
                phone,
            },
        });
        return {
            success: true,
            activationLink: undefined,
            emailSent: false,
        };
    }
    const activationToken = crypto.randomBytes(32).toString("hex");
    const activationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    if (existingUser) {
        await prisma.user.update({
            where: { id: existingUser.id },
            data: {
                firstName,
                lastName,
                phone,
                activationToken,
                activationTokenExpiry,
            },
        });
    }
    else {
        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                password: null,
                role: Role.USER,
                activationToken,
                activationTokenExpiry,
            },
        });
    }
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const activationLink = `${frontendUrl}/activate?email=${encodeURIComponent(email)}&token=${activationToken}`;
    const emailResult = await sendActivationEmail(email, firstName, activationLink);
    return {
        success: emailResult.success,
        activationLink,
        emailSent: emailResult.success,
    };
};
