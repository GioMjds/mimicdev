import express from 'express';
import {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} from "../controller/blogController";
import { validateCreateBlog, validateUpdateBlog } from "../middleware/blogMiddleware";

const router = express.Router();

// Fetch all blogs
router.get('/', getAllBlogs);

// Fetch a single blog post by ID
router.get('/:id', getBlogById);

// Create a blog post by ID
router.post("/create", validateCreateBlog, createBlog);

// Update a blog post by ID
router.put("/:id", validateUpdateBlog, updateBlog);

// Delete a blog post by ID
router.delete("/:id", deleteBlog);

export default router;