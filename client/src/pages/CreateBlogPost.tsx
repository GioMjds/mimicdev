import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"

interface BlogForm {
  title: string;
  content: string;
}

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<BlogForm>();

  const onSubmit: SubmitHandler<BlogForm> = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/blogs/create`, data);
      alert("Blog post created successfully");
      console.table(response.data);
      navigate('/');
    } catch (error) {
      console.error(`Error creating blog post: ${error}`);
    }
  }
  return (
    <motion.div
      className="min-h-screen p-6 bg-sea-blue"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold text-center mb-6">Create Blog Post</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-white bg-opacity-10 shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Content</label>
          <textarea
            {...register("content", { required: true })}
            rows={6}
            className="w-full p-2 border rounded-md resize-none"
          />
        </div>
        <NavLink
          to='/'
          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600 transition-all duration-300"
        >
          &larr; Go Back
        </NavLink>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Create Blog Post
        </button>
      </form>
    </motion.div>
  )
}

export default CreateBlogPost