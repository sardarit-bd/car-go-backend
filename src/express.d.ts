import "express";

declare global {
  namespace Express {
    interface Request {
      // Add custom properties here if needed (e.g., user?: any;)
      // Do NOT override params or query here to avoid generic interface conflicts.
    }
  }
}

export {};
