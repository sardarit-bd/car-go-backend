import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs"; // <-- ADDED: Node file system module
import { Request } from "express";

const uploadDir = "uploads";

// Automatically create the 'uploads' directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    cb(null, uploadDir); // <-- UPDATED: Use the constant
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configure file filter for IMAGES
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = [".jpg", ".jpeg", ".png", ".webp"];
  
  if (allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (.jpg, .jpeg, .png, .webp) are allowed"));
  }
};

// Initialize multer
const upload = multer({ storage, fileFilter });

export default upload;