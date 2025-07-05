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
                setUser(data.user);
            } catch {
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
        } catch {
            return false;
        }
    };

    const logout = async () => {
        try {
            await API.post('/auth/logout');
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
