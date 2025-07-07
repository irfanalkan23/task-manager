import { useState, useEffect } from 'react';
import API from '../api/api';
import { useAuth } from '../hooks/useAuth';
import './TaskList.css';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const { user, isLoading } = useAuth();
    console.log('🔍 TaskList render →', { user, isLoading });

    const fetchTasks = async () => {
        console.log('🚀 fetchTasks() start');
        try {
            const { data } = await API.get('/tasks');
            console.log('📥 fetchTasks() got data:', data);
            setTasks(data);
        } catch (error) {
            console.error('❌ fetchTasks() error:', error);
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
        console.log('🔁 TaskList useEffect fired:', { user, isLoading });
        if (!isLoading && user) {
            console.log('✅ Conditions met, calling fetchTasks()');
            fetchTasks();
        }
    }, [isLoading, user]);

    return (
        <div className="task-manager">
            <h2 className="task-title">Your Tasks</h2>

            <div className="task-input-group">
                <input
                    type="text"
                    className="task-input"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New task..."
                />
                <button className="task-button" onClick={addTask}>Add Task</button>
            </div>

            <ul className="task-list">
                {tasks.map(task => (
                    <li
                        key={task._id}
                        className={`task-item ${task.completed ? 'completed' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task._id, task.completed)}
                        />
                        <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                            {task.title}
                        </span>
                        <button className="task-button" onClick={() => deleteTask(task._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}