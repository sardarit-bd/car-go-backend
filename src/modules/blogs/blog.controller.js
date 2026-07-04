import * as blogService from "./blog.service";
import sendResponse from "../../shared/utils/response";
import AppError from "../../shared/utils/AppError";
export const createBlog = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "ADMIN") {
            throw new AppError("Forbidden: Admin access required", 403);
        }
        const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
        const blog = await blogService.createBlogService(req.body, user.id, imagePath);
        sendResponse(res, 201, true, "Blog post created successfully", blog);
    }
    catch (error) {
        next(error);
    }
};
export const getAllBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        const result = await blogService.getAllBlogsService(page, limit, search);
        sendResponse(res, 200, true, "Blogs fetched successfully", result);
    }
    catch (error) {
        next(error);
    }
};
export const getBlogBySlug = async (req, res, next) => {
    try {
        const blog = await blogService.getBlogBySlugService(req.params.slug);
        sendResponse(res, 200, true, "Blog fetched successfully", blog);
    }
    catch (error) {
        next(error);
    }
};
export const updateBlog = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "ADMIN") {
            throw new AppError("Forbidden: Admin access required", 403);
        }
        const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
        const blog = await blogService.updateBlogService(req.params.id, req.body, imagePath);
        sendResponse(res, 200, true, "Blog post updated successfully", blog);
    }
    catch (error) {
        next(error);
    }
};
export const deleteBlog = async (req, res, next) => {
    try {
        const user = req.user;
        if (user.role !== "ADMIN") {
            throw new AppError("Forbidden: Admin access required", 403);
        }
        await blogService.deleteBlogService(req.params.id);
        sendResponse(res, 200, true, "Blog post deleted successfully", null);
    }
    catch (error) {
        next(error);
    }
};
