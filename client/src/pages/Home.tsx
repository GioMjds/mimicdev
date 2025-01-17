import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlogPosts, deleteBlogPost } from "../services/axios";

interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
}

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogPosts();
                setBlogs(data);
            } catch (error) {
                console.log(`Error fetching data: ${error}`);
            }
        };

        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this blog?");
        if (!confirm) return;

        try {
            await deleteBlogPost(id);
            setBlogs(blogs.filter((blog) => blog._id !== id));
        } catch (error) {
            console.error(`Error deleting blog post: ${error}`);
            setError(`Error deleting blog post: ${error}`);
        }
    };

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <motion.div
            className="min-h-screen p-6 bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1 className="text-4xl font-bold text-center mb-6">Welcome to My Blog</h1>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white shadow-md rounded-lg p-4 relative group"
                    >
                        <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
                        <p className="text-gray-600 mb-4">By {blog.author}</p>
                        <p className="text-gray-700 line-clamp-3">{blog.content}</p>
                        <Link
                            to={`/blogs/${blog._id}`}
                            className="text-blue-500 hover:underline mt-4 inline-block"
                        >
                            Read More
                        </Link>

                        <div className="absolute top-4 right-4 hidden group-hover:flex space-x-2">
                            <button
                                onClick={() => navigate(`/edit/${blog._id}`)}
                                className="bg-yellow-400 text-white px-2 py-1 rounded-md hover:bg-yellow-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(blog._id)}
                                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Home;
