import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
  const navigate = useNavigate();

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
    <>
      <div className="max-w-7xl mx-auto bg-white bg-opacity-30 shadow-md rounded-lg p-4">
        <p onClick={() => navigate('/')} className="cursor-pointer text-xl mb-1">&larr; Go Back</p>
        <i className="text-gray-100 text-sm mb-2 mx-10">
          Posted on {new Date(blog.createdAt).toLocaleDateString()}
        </i>
        <h1 className="text-3xl mb-3 mx-10 text-gray-100 font-bold text-left">{blog.title}</h1>
        <p className="text-gray-100 text-justify mx-10">{blog.content}</p>
      </div>
    </>
  )
}

export default BlogPost