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
// GET /blogs/:id
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
        console.log(`${deletedBlog} deleted successfully!`);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
})

// Search for blog posts
// GET /blogs/search
router.get('/search', async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm as string;
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { content: { $regex: searchTerm, $options: 'i' } },
                { author: { $regex: searchTerm, $options: 'i' } },
                { createdAt: { $regex: searchTerm, $options: 'i' } },
            ]
        });
        console.log(blogs);
        res.status(200).json(blogs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new blog post
// POST /blogs/create
router.post('/create', async (req: Request, res: Response) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.title,
            content: req.body.content
        });
        console.log(newBlog);
        res.status(200).json(newBlog);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
})

export default router;