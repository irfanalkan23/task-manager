import axios from 'axios';

const API = axios.create({
    baseURL: '/api', // Uses the proxy
    timeout: 5000,
});

// Add JWT token to requests if logged in
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;

// Step 2: Create an API Service (Axios)
// Created a new file src/api/api.js in my React app
