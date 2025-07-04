import { useState, useEffect } from 'react';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const { user } = useAuth();

    const fetchTasks = async () => {
        try {
            const { data } = await API.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    const addTask = async () => {
        if (!newTask.trim()) return;
        try {
            await API.post('/tasks', { title: newTask });
            setNewTask('');
            fetchTasks();
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const toggleTask = async (id, completed) => {
        try {
            await API.put(`/tasks/${id}`, { completed: !completed });
            fetchTasks();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    useEffect(() => {
        if (user) fetchTasks();
    }, [user]);

    return (
        <div>
            <h2>Your Tasks</h2>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task..."
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task._id, task.completed)}
                        />
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.title}
                        </span>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}