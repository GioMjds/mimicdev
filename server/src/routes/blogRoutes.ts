import express, { Request, Response } from 'express';
import Blog from '../models/Blog';

const router = express.Router();

// Fetch all blogs
// GET /blogs
router.get('/', async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch a single blog post by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params.id);
        !blog && res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Update a blog post by ID
// PUT /blogs/:id
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        !updatedBlog && res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(updatedBlog);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a blog post by ID
// DELETE /blogs/:id
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        !deletedBlog && res.status(404).json({ message: 'Blog not found' });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
})

export default router;