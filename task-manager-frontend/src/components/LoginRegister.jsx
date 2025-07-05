import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import API from '../api/api';
import checklistImage from '../assets/checklist.jpeg';

export default function LoginRegister() {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'login') {
            const success = await login(email, password);
            if (success) navigate('/');
        } else {
            try {
                await API.post('/auth/register', { email, password });
                setMode('login');
            } catch (err) {
                console.error('Registration failed:', err);
            }
        }
    };

    return (
        <div className="form-container">
            <img
                src={checklistImage}
                alt="Task checklist illustration"
                className="welcome-image"
            />

            <h2 className="welcome-text">Welcome to Task Manager</h2>
            <div className="form-header">
                <button
                    className={mode === 'login' ? 'active' : ''}
                    onClick={() => setMode('login')}
                >
                    Login
                </button>
                <button
                    className={mode === 'register' ? 'active' : ''}
                    onClick={() => setMode('register')}
                >
                    Register
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
            </form>
        </div>
    );
}
