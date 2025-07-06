import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
      <div className="navbar-right">
        {user && (
          <>
            <span className="navbar-user">Logged in as <strong>{user.email}</strong></span>
            <button onClick={() => { logout(); navigate('/'); }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}


function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <AuthProvider>
        <div className="App">
          <Navigation />
          <div className="app-container">
            <Routes>
              <Route path="/" element={<LoginRegister />} />
              <Route
                path="/tasks"
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
