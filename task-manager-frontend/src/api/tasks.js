import axios from 'axios';

export const getTasks = () => axios.get('/api/tasks', {
    withCredentials: true
});

export const createTask = (title) => axios.post('/api/tasks', {
    title
}, {
    withCredentials: true
});