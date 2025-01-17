import { FC, useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { motion } from 'framer-motion'
import { getBlogPostById } from "../services/axios"
import Loading from "../components/Loading";

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
        const data = await getBlogPostById(id!);
        setBlog(data);
      } catch (error) {
        setError(`Error fetching data: ${error}`);
      }
    };
    if (id) fetchBlogPost();
  }, [id]);

  if (error) return <div>{error}</div>
  if (!blog) return <Loading text="Reloading blog post..." timeout={5000} onTimeout={() => window.location.reload()} />

  return (
    <motion.div
      className="min-h-screen p-6 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <NavLink to='/' className='p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md mb-4'>&larr; Back</NavLink>
        <h1 className="text-4xl font-bold text-left my-4">{blog.title}</h1>
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