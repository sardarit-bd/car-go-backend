import { getCmsAboutUs, createOrUpdateCmsAboutUsService, deleteCmsAboutUsService, } from "./cmsAboutUs.service.js";
import successResponse from "../../../shared/utils/response.js";
import multer from "multer";
import path from "path";
import fs from "fs";
// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image files are allowed!"));
        }
    },
});
export const getCmsAboutUsController = async (req, res, next) => {
    try {
        const aboutUs = await getCmsAboutUs();
        return successResponse(res, 200, true, "Contact fetched successfully", aboutUs);
    }
    catch (error) {
        next(error);
    }
};
export const createOrUpdateCmsAboutUsController = async (req, res, next) => {
    try {
        const aboutUs = await createOrUpdateCmsAboutUsService(req.body);
        return successResponse(res, 201, true, "Contact created successfully", aboutUs);
    }
    catch (error) {
        next(error);
    }
};
export const deleteCmsAboutUsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteCmsAboutUsService(id);
        return successResponse(res, 200, true, "Contact fetched successfully", null);
    }
    catch (error) {
        next(error);
    }
};
export const uploadImageController = async (req, res, next) => {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, message: "No file uploaded" });
        }
        const imageUrl = `/uploads/${req.file.filename}`;
        return successResponse(res, 200, true, "Contact fetched successfully", {
            url: imageUrl,
        });
    }
    catch (error) {
        next(error);
    }
};
export const uploadMiddleware = upload.single("image");
