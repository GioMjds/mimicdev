import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";

interface BlogForm {
  title: string;
  content: string;
}

const EditBlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<BlogForm>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
        reset({
          title: data.title,
          content: data.content,
        });
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        setError(`Error fetching data: ${error}`);
      }
    };

    fetchBlogPost();
  }, [id, reset]);

  const onSubmit: SubmitHandler<BlogForm> = async (data) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/blogs/${id}`, data);
      alert("Blog post updated successfully!");
      navigate('/');
    } catch (error) {
      console.error(`Error updating blog post: ${error}`);
      setError(`Error updating blog post: ${error}`);
    }
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <motion.div
      className="min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold text-center mb-6">Edit Blog Post</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-gray-800 bg-opacity-30 shadow-md rounded-lg p-6"
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
          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
        >
          &larr; Go Back
        </NavLink>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </motion.div>
  );
};

export default EditBlogPost;
