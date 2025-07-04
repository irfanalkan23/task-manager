// src/axios.js
import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // important for sending cookies
});

export default AxiosInstance;
