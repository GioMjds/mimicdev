import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlogPosts, deleteBlogPost } from "../services/axios";
import Search from "../components/Search";

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
        <>
            <div className="flex flex-col gap-2 space-y-3 max-w-7xl mx-auto">
                <Search />
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="bg-white bg-opacity-10 shadow-md rounded-lg p-4 flex justify-between"
                    >
                        <div>
                            <i className="text-sm">Posted in: {new Date(blog.createdAt).toLocaleDateString()}</i>
                            <h2 className="text-2xl my-2 font-bold mb-2">{blog.title}</h2>
                        </div>
                        <div className="flex space-x-2 p-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.90 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                onClick={() => navigate(`/blogs/${blog._id}`)}
                                className="bg-gradient-to-br from-green-500 to-green-800 text-white p-4 rounded-md"
                            >
                                <i className="fas fa-eye"></i>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.90 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                onClick={() => navigate(`/edit/${blog._id}`)}
                                className="bg-gradient-to-br from-navy-dark to-purple-bland text-white p-4 rounded-md"
                            >
                                <i className="fas fa-edit"></i>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.90 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                onClick={() => handleDelete(blog._id)}
                                className="bg-gradient-to-br from-red-500 to-red-800 text-white p-4 rounded-md"
                            >
                                <i className="fas fa-trash"></i>
                            </motion.button>
                        </div>
                    </div>
                ))}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.90 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => navigate("/create")}
                    className="mx-auto bg-gradient-to-br from-navy-bland to-pastel-lightblue text-white p-4 rounded-md"
                >
                    <i className="fas fa-plus"></i> Create Blog Post
                </motion.button>
            </div>
        </>
    );
};

export default Home;
