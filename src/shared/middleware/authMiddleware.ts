import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as authRepository from "../../modules/auth/auth.repository";
import AppError from "../utils/AppError";

interface DecodedToken extends JwtPayload {
  id: string;
  role: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized, token missing", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedToken;

    const user = await authRepository.findUserById(decoded.id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    (req as any).user = user;
    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

export default authMiddleware;