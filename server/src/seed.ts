require("dotenv").config();
import mongoose from "mongoose";
import Blog from "./models/Blog";

interface Blogs {
  title: string;
  content: string;
  author: string;
}

const sampleBlogs: Blogs[] = [
  {
    title: "First Blog Post",
    content:
      "This is the content of the first blog post. It's really engaging!",
    author: "Super User",
  },
  {
    title: "Exploring the World of MongoDB",
    content:
      "MongoDB is a NoSQL database that stores data in a flexible, JSON-like format.",
    author: "Super User",
  },
  {
    title: "Understanding React State Management",
    content:
      "React offers various ways to manage state, including useState, useReducer, and context API.",
    author: "Super User",
  },
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
        await Blog.deleteMany();
        await Blog.insertMany(sampleBlogs);
        console.log("mimicdev database seeded!");
        process.exit();
    } catch (error: any) {
        console.error(`Error seeding database: ${error}`);
        process.exit(1);
    }
}

seedData();