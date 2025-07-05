import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './hooks/useAuth';
import TaskList from './components/TaskList';
import LoginRegister from './components/LoginRegister';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="app-title">Task Manager</h1>
      <div className="auth-buttons">
        {user ? (
          <button onClick={() => { logout(); navigate('/login'); }}>
            Logout
          </button>
        ) : (
          <Link to="/auth">Login / Register</Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Navigation />
          <div className="app-container">
            <Routes>
              <Route path="/auth" element={<LoginRegister />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <TaskList />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
