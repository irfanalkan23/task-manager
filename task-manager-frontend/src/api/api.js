import axios from 'axios';

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true,
});


API.interceptors.response.use(
    response => response,
    error => {
        // ❌ Removed the redirect
        return Promise.reject(error);
    }
);


export default API;