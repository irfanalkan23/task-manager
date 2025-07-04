import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Welcome, {user?.email}!</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}