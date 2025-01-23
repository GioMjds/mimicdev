import { NavLink, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useState } from "react";
import Notification from "../components/NotificationBox";

interface BlogForm {
  title: string;
  content: string;
}

const CreateBlogPost = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset } = useForm<BlogForm>();
  const [isOpen, setIsOpen] = useState(false);
  const [notificationType, setNotificationType] = useState<string>("");
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const onSubmit: SubmitHandler<BlogForm> = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/blogs/create`, data);
      console.table(response.data);
      navigate('/');
      reset();
      setNotificationType('success');
      setNotificationMessage('Blog post created successfully!');
      setIsOpen(true);
    } catch (error) {
      console.error(`Error creating blog post: ${error}`);
      setNotificationType('error');
      setNotificationMessage('Error creating blog post. Please try again.');
      setIsOpen(true);
    }
  };

  const handleNotificationClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        className="min-h-screen p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-4xl font-bold text-center mb-6">Create Blog Post</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto bg-gray-800 bg-opacity-30 shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label className="block font-semibold mb-2">Title</label>
            <input
              {...register("title", {
                required: "Title is missing. It is required.",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters long.",
                }
              })}
              className={`w-full p-2 border rounded-md ${formState.errors.title ? "border-red-500" : ""
                }`}
            />
            {formState.errors.title && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Content</label>
            <textarea
              {...register("content", {
                required: "Content is missing. It is required.",
                minLength: {
                  value: 10,
                  message: "Content must be at least 10 characters long.",
                }
              })}
              rows={6}
              className={`w-full p-2 border rounded-md resize-none ${formState.errors.content ? "border-red-500" : ""
                }`}
            />
            {formState.errors.content && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.content.message}</p>
            )}
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
            Upload Blog
          </button>
        </form>
      </motion.div>
      {isOpen && (
        <Notification
          type={notificationType}
          message={notificationMessage}
          isVisible={isOpen}
          onClose={handleNotificationClose}
        />
      )}
    </>
  )
}

export default CreateBlogPost