import { Request, Response, NextFunction } from "express";
import * as blogService from "./blog.service";
import sendResponse from "../../shared/utils/response";
import AppError from "../../shared/utils/AppError";

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;
    if (user.role !== "ADMIN") {
      throw new AppError("Forbidden: Admin access required", 403);
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const blog = await blogService.createBlogService(
      req.body,
      user.id,
      imagePath,
    );

    sendResponse(res, 201, true, "Blog post created successfully", blog);
  } catch (error) {
    next(error);
  }
};

export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const result = await blogService.getAllBlogsService(page, limit, search);
    sendResponse(res, 200, true, "Blogs fetched successfully", result);
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const blog = await blogService.getBlogBySlugService(
      req.params.slug as string,
    );
    sendResponse(res, 200, true, "Blog fetched successfully", blog);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;
    if (user.role !== "ADMIN") {
      throw new AppError("Forbidden: Admin access required", 403);
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
    const blog = await blogService.updateBlogService(
      req.params.id as string,
      req.body,
      imagePath,
    );

    sendResponse(res, 200, true, "Blog post updated successfully", blog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;
    if (user.role !== "ADMIN") {
      throw new AppError("Forbidden: Admin access required", 403);
    }

    await blogService.deleteBlogService(req.params.id as string);
    sendResponse(res, 200, true, "Blog post deleted successfully", null);
  } catch (error) {
    next(error);
  }
};
