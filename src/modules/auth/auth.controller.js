import * as authService from "./auth.service";
import sendResponse from "../../shared/utils/response";

// Cookie configuration
const isProduction = process.env.NODE_ENV === "production";

const COOKIE_OPTIONS = {
  httpOnly: true,

  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",

  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body);

    res.cookie("token", token, COOKIE_OPTIONS);

    sendResponse(res, 201, true, "User registered successfully", { user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    console.log("hiited login");
    const { user, token } = await authService.login(req.body);

    res.cookie("token", token, COOKIE_OPTIONS);
    sendResponse(res, 200, true, "Login successful", { user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: COOKIE_OPTIONS.httpOnly,
      secure: COOKIE_OPTIONS.secure,
      sameSite: COOKIE_OPTIONS.sameSite,
      path: COOKIE_OPTIONS.path,
    });
    sendResponse(res, 200, true, "Logged out successfully", null);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    sendResponse(
      res,
      200,
      true,
      "Password reset link generated successfully",
      result,
    );
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    sendResponse(res, 200, true, "Password reset successfully", null);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await authService.getProfile(userId);
    sendResponse(res, 200, true, "Profile fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await authService.updateProfile(userId, req.body);
    sendResponse(res, 200, true, "Profile updated successfully", user);
  } catch (error) {
    next(error);
  }
};
