import Blog from "../models/Blog";

export const getAllBlogs = async () => {
    return await Blog.find().sort({ createdAt: -1 });
};

export const getBlogById = async (id: string) => {
    return await Blog.findById(id);
};

export const createBlog = async (title: string, content: string) => {
    return await Blog.create({ title, content });
};

export const updateBlog = async (id: string, title: string, content: string) => {
    return await Blog.findByIdAndUpdate(id, { title, content }, { new: true });
};

export const deleteBlog = async (id: string) => {
    return await Blog.findByIdAndDelete(id);
};