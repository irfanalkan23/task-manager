import { useState, useEffect } from 'react';
import { getTasks, createTask } from '../api/tasks';
import './TaskList.css';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await getTasks();
            setTasks(res.data);
        } catch (err) {
            setError('Failed to load tasks');
            console.error('Fetch tasks error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTask = async () => {
        if (!newTaskTitle.trim()) return;

        setIsLoading(true);
        setError(null);
        try {
            await createTask(newTaskTitle);
            setNewTaskTitle('');
            await fetchTasks(); // Wait for refresh
        } catch (err) {
            setError('Failed to add task');
            console.error('Add task error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="task-manager">
            <h2 className="task-title">Tasks</h2>

            {/* Error display */}
            {error && <div className="error-message">{error}</div>}

            <div className="task-input-group">
                <input
                    className="task-input"
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="New task title"
                    disabled={isLoading}
                />
                <button
                    className="task-button"
                    onClick={handleAddTask}
                    disabled={isLoading || !newTaskTitle.trim()}
                >
                    {isLoading ? 'Adding...' : 'Add Task'}
                </button>
            </div>

            {/* Loading state */}
            {isLoading && !tasks.length ? (
                <div className="loading-spinner">Loading tasks...</div>
            ) : (
                <ul className="task-list">
                    {tasks.map(task => (
                        <li
                            className={`task-item ${task.completed ? 'completed' : ''}`}
                            key={task._id}
                        >
                            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                                {task.title}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}