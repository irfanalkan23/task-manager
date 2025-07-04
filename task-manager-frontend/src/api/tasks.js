import API from './api'; // Use the unified Axios instance

export const getTasks = () => API.get('/tasks'); // Removed duplicate withCredentials
export const createTask = (title) => API.post('/tasks', { title });