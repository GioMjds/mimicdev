import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const getBlogPosts = async () => {
    try {
        const response = await API.get('/blogs');
        return response.data;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        throw error;
    }
};

export const getBlogPostById = async (id: string) => {
    try {
        const response = await API.get(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        throw error;
    }
};

export const createBlogPost = async (postData: any) => {
    try {
        const response = await API.post('/blogs', postData);
        return response.data;
    } catch (error) {
        console.error(`Error creating blog post: ${error}`);
        throw error;
    }
};

export const updateBlogPost = async (id: string, postData: any) => {
    try {
        const response = await API.put(`/blogs/${id}`, postData);
        return response.data;
    } catch (error) {
        console.error(`Error updating blog post: ${error}`);
        throw error;
    }
};

export const deleteBlogPost = async (id: string) => {
    try {
        const response = await API.delete(`/blogs/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting blog post: ${error}`);
        throw error;
    }
};