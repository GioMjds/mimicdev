import { Request, Response, NextFunction } from 'express';

export const validateCreateBlog = (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    if (!title || !content) res.status(400).json({ message: 'Please provide a title and content' });
    next();
};

export const validateUpdateBlog = (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    if (!title && !content) res.status(400).json({ message: 'Please provide a title or content to update' });
    next();
}