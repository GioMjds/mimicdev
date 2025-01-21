import { Request, Response } from 'express';
import Blog from '../models/Blog';

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogById = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id);
        !blog && res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createBlog = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) res.status(400).json({ message: 'Please provide a title and content' });
        const newBlog = await Blog.create({
            title, content
        });
        res.status(200).json(newBlog);
    } catch (error: any) {
        console.error(`Error: ${error}`);
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        !updatedBlog && res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(updatedBlog);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        !deletedBlog && res.status(404).json({ message: 'Blog not found' });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};