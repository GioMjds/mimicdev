require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import blogRoutes from './routes/blogRoutes';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use('/blogs', blogRoutes);

connectDB();

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});