import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import API from '../api/api';
import checklistImage from '../assets/checklist.jpeg';

export default function LoginRegister() {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/tasks';


    useEffect(() => {
        if (user) {
            navigate('/tasks');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (mode === 'login') {
            const success = await login(email, password);
            if (success) {
                toast.success('Welcome back!');
                navigate(from, { replace: true });
            } else {
                toast.error('Invalid email or password');
            }
        } else {
            try {
                await API.post('/auth/register', { email, password });
                toast.success('Registration successful! Please log in.');
                setMode('login');
            } catch (err) {
                const res = err.response;

                if (res?.status === 400 && res.data?.errors) {
                    // Validation errors from express-validator
                    res.data.errors.forEach(error => {
                        toast.error(error.msg);
                    });
                } else if (res?.status === 400 && res.data?.message === 'Email already exists') {
                    toast.error('This email is already registered.');
                } else {
                    toast.error('Registration failed. Please try again.');
                }
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
