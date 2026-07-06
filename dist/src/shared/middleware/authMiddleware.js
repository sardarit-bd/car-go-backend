import jwt from "jsonwebtoken";
import * as authRepository from "../../modules/auth/auth.repository.js";
import AppError from "../utils/AppError.js";
const authMiddleware = async (req, res, next) => {
    // 1. Try to get token from httpOnly cookie
    let token = req.cookies?.token;
    // 2. Fallback to Authorization header (useful for Postman testing)
    if (!token) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }
    if (!token) {
        return next(new AppError("Unauthorized, token missing", 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await authRepository.findUserById(decoded.id);
        if (!user) {
            return next(new AppError("User not found", 404));
        }
        req.user = user;
        next();
    }
    catch (err) {
        return next(new AppError("Invalid or expired token", 401));
    }
};
export default authMiddleware;
