import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import API from '../api/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const { data } = await API.get('/auth/verify');
                console.log('✅ /auth/verify success:', data);
                setUser(data.user);
            } catch (err) {
                console.error('❌ /auth/verify failed:', err);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await API.post('/auth/login', { email, password });
            setUser(data.user);
            return true;
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            return false;
        }
    };


    const logout = async () => {
        try {
            await API.post('/auth/logout');
            toast.info('You’ve been logged out.');
        } finally {
            setUser(null);
            window.location.href = '/';
        }
    };


    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
