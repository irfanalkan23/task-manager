import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
}

// Step 4: Task Management (CRUD) - 2
// Protected Route Example (src/components/ProtectedRoute.js)