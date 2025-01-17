import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import { motion } from 'framer-motion'

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const BlogPost: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setBlog(data);
      } catch (error) {
        setError(`Error fetching data: ${error}`);
      }
    };
    fetchBlogPost();
  }, [id]);

  if (error) return <div>{error}</div>
  if (!blog) return <div>Loading...</div>
  return (
    <motion.div
      className="min-h-screen p-6 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold text-center mb-6">{blog.title}</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-600 mb-4">By {blog.author}</p>
        <p className="text-gray-700">{blog.content}</p>
        <p className="text-gray-500 text-sm mt-4">
          Posted on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  )
}

export default BlogPost