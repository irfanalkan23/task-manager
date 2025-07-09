import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import API from '../api/api';

export default function LoginRegister() {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/tasks';

    useEffect(() => {
        if (user) navigate(from, { replace: true });
    }, [user, navigate, from]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'login') {
            const success = await login(email, password);
            return success
                ? toast.success('Welcome back!')
                : toast.error('Invalid email or password');
        }
        // register
        try {
            await API.post('/auth/register', { email, password });
            toast.success('Registration successful! Please log in.');
            setMode('login');
        } catch (err) {
            const res = err.response;
            if (res?.status === 400 && res.data?.errors) {
                res.data.errors.forEach(({ msg }) => toast.error(msg));
            } else if (res?.status === 400 && res.data?.message === 'Email already exists') {
                toast.error('This email is already registered.');
            } else {
                toast.error('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="landing-page">
            <div className="landing-card">
                <img
                    src="/checklist.jpeg"
                    alt="Checklist"
                    className="welcome-image"
                />

                <h2>Stay on top of your tasks</h2>
                <p className="subtitle">
                    Organize, prioritize, and achieve more every day.
                </p>

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
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit">
                        {mode === 'login' ? 'Login' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}
