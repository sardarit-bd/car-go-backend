import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service.js";
import sendResponse from "../../shared/utils/response.js";

// Cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true, // Prevents XSS (JavaScript cannot read it)
  secure: process.env.NODE_ENV === "production", // Use true in production (requires HTTPS)
  sameSite: "lax" as const, // Protects against CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matches your JWT expiry)
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, token } = await authService.register(req.body);
    
    // Set the httpOnly cookie
    res.cookie("token", token, COOKIE_OPTIONS);
    
    // We no longer send the token in the body for security reasons
    sendResponse(res, 201, true, "User registered successfully", { user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, token } = await authService.login(req.body);
    
    // Set the httpOnly cookie
    res.cookie("token", token, COOKIE_OPTIONS);
    
    sendResponse(res, 200, true, "Login successful", { user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Clear the cookie
    res.clearCookie("token");
    sendResponse(res, 200, true, "Logged out successfully", null);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    sendResponse(res, 200, true, "Password reset link generated successfully", result);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    sendResponse(res, 200, true, "Password reset successfully", null);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const user = await authService.getProfile(userId);
    sendResponse(res, 200, true, "Profile fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const user = await authService.updateProfile(userId, req.body);
    sendResponse(res, 200, true, "Profile updated successfully", user);
  } catch (error) {
    next(error);
  }
};