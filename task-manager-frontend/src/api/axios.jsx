// 3️⃣ Connect Frontend to Backend

// src/api/axios.js
import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:5000/api", // Change in production
});

// Add JWT to headers if logged in
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
