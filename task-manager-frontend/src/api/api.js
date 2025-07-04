import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // ✅ required for cookies
});

API.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // Handle unauthorized (redirect to login)
            window.location = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;