import * as blogRepository from "./blog.repository.js";
import AppError from "../../shared/utils/AppError.js";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export const createBlogService = async (data: any, authorId: string, imagePath?: string) => {
  let slug = generateSlug(data.title);
  
  // Ensure slug is unique
  const existing = await blogRepository.findBlogBySlug(slug);
  if (existing) {
     slug = `${slug}-${Date.now()}`;
  }
  
  data.slug = slug;
  data.authorId = authorId;
  if (imagePath) data.image = imagePath;
  if (data.date) data.date = new Date(data.date);

  return blogRepository.createBlog(data);
};

export const getAllBlogsService = async (page: number = 1, limit: number = 10, search?: string) => {
  return blogRepository.getAllBlogs(page, limit, search);
};

export const getBlogBySlugService = async (slug: string) => {
  const blog = await blogRepository.findBlogBySlug(slug);
  if (!blog) throw new AppError("Blog post not found", 404);
  return blog;
};

export const updateBlogService = async (id: string, data: any, imagePath?: string) => {
  const blog = await blogRepository.findBlogById(id);
  if (!blog) throw new AppError("Blog post not found", 404);

  if (data.title) {
    let newSlug = generateSlug(data.title);
    const existing = await blogRepository.findBlogBySlug(newSlug);
    // If slug exists and belongs to a DIFFERENT blog, append timestamp
    if (existing && existing.id !== id) {
       newSlug = `${newSlug}-${Date.now()}`;
    }
    data.slug = newSlug;
  }
  
  if (imagePath) {
    data.image = imagePath;
  }
  
  if (data.date) {
    data.date = new Date(data.date);
  }

  return blogRepository.updateBlog(id, data);
};

export const deleteBlogService = async (id: string) => {
  const blog = await blogRepository.findBlogById(id);
  if (!blog) throw new AppError("Blog post not found", 404);
  return blogRepository.deleteBlog(id);
};