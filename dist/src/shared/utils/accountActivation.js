import crypto from "crypto";
import { prisma } from "../../../lib/prisma.js";
import { Role } from "../../../generated/prisma/enums.js";
import { sendActivationEmail } from "./emailService.js";
/**
 * Call this function during checkout after a booking is confirmed.
 * It creates a pending user or updates an existing one with a fresh activation token,
 * and sends the activation email.
 */
export const triggerGuestAccountActivation = async (params) => {
    const { email, firstName, lastName, phone } = params;
    // 1. Generate secure token (valid for 24 hours)
    const activationToken = crypto.randomBytes(32).toString("hex");
    const activationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
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
    // 3. Generate the frontend activation link
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const activationLink = `${frontendUrl}/activate?email=${encodeURIComponent(email)}&token=${activationToken}`;
    // 4. Send the actual email
    const emailResult = await sendActivationEmail(email, firstName, activationLink);
    // Return the result (including the link for the frontend response, and email status)
    return {
        success: emailResult.success,
        activationLink,
        emailSent: emailResult.success,
    };
};
