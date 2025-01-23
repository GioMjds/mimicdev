require('dotenv').config();
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { connectDB } from './config/db';
import blogRoutes from './routes/blogRoutes';
import authRoutes from './routes/authRoutes';
import passport from 'passport';
import MongoStore from 'connect-mongo';

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI as string,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/blogs', blogRoutes);
app.use('/auth', authRoutes);

connectDB();

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});