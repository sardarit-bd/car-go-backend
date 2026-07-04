import * as yup from "yup";
export const createBlogSchema = yup.object({
    title: yup.string().required("Title is required").min(1, "Title cannot be empty"),
    content: yup.string().required("Content is required").min(1, "Content cannot be empty"),
    date: yup.string().optional(),
});
export const updateBlogSchema = yup.object({
    title: yup.string().optional(),
    content: yup.string().optional(),
    date: yup.string().optional(),
});
