import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlogPosts, deleteBlogPost } from "../services/axios";
import Loading from "../components/Loading";
import ModalBox from "../components/ModalBox";

interface Blog {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

const Home: FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string>("");
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogPosts();
                setBlogs(data);
                setLoading(false);
            } catch (error) {
                console.log(`Error fetching data: ${error}`);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleDelete = (item: string) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteBlogPost(selectedItem);
            setBlogs(blogs.filter((blog) => blog._id !== selectedItem));
            console.log(`Deleted item: ${selectedItem}`);
        } catch (error) {
            console.log(`Error deleting item: ${error}`);
        }
        setIsOpen(false);
    };

    const handleCancelDelete = () => {
        setIsOpen(false);
    };

    if (loading) return <Loading text="Fetching blog posts...." timeout={5000} />;

    return (
        <div>
            <div className="flex flex-col gap-2 space-y-3 max-w-7xl mx-auto">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="rounded-lg p-4 flex justify-between"
                    >
                        <div className="flex flex-col">
                            <i className="text-sm">Posted in: {new Date(blog.createdAt).toLocaleDateString()}</i>
                            <h2 className="text-2xl my-2 font-bold mb-2 hover:cursor-pointer hover:underline" onClick={() => navigate(`/blogs/${blog._id}`)}>{blog.title}</h2>
                        </div>
                        <div className="flex flex-col space-y-2 p-1">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.90 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                onClick={() => navigate(`/edit/${blog._id}`)}
                                className="bg-green-600 text-sm text-white p-4 rounded-md"
                            >
                                <i className="fas fa-edit"></i> Edit Blog
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.90 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                onClick={() => handleDelete(blog._id)}
                                className="bg-red-600 text-sm text-white p-4 rounded-md"
                            >
                                <i className="fas fa-trash"></i> Delete Blog
                            </motion.button>
                        </div>
                    </div>
                ))}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.90 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    onClick={() => navigate("/create")}
                    className="max-w-7xl mx-auto bg-green-700 text-white p-4 rounded-md"
                >
                    <i className="fas fa-plus"></i> Create Blog Post
                </motion.button>
            </div>

            {isOpen && (
                <ModalBox
                    title="Deleting Blog Post"
                    modalMsg={`Are you sure you want to delete this blog post?`}
                    onClose={handleCancelDelete}
                    cancelBtn="Cancel"
                    primaryBtn="Delete Blog"
                    onPrimaryBtnClick={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default Home;