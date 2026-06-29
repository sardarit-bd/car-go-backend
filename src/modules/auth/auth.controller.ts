import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import sendResponse from "../../shared/utils/response";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const { user, token } = await authService.register(req.body);
    sendResponse(res, 201, true, "User registered successfully", { user, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, token } = await authService.login(req.body);
    sendResponse(res, 200, true, "Login successful", { user, token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Since we use stateless JWT, logout is handled client-side by deleting the token.
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