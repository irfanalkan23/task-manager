import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import API from '../api/api';

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
                <img
                    src="https://png.pngtree.com/png-clipart/20230811/original/pngtree-vibrant-banner-with-a-warm-welcome-message-perfect-for-decor-and-ornamentation-vector-picture-image_10313059.png"
                    alt="Welcome"
                    className="welcome-image"
                />
                <h2 className="welcome-text">Welcome to Task Manager</h2>

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
