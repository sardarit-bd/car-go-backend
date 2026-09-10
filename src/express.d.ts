import "express";
import type { findUserById } from "./modules/auth/auth.repository.js";

type AuthenticatedUser = NonNullable<Awaited<ReturnType<typeof findUserById>>>;

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};