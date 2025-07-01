import { useState, useEffect } from 'react'; // Added useEffect import
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  // For Testing Loading State:
  // When you want to test the spinner later, you can temporarily add:
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="app-title">Task Manager</h1>
        <div className="auth-buttons">
          <button className="btn login-btn">Login</button>
          <button className="btn register-btn">Register</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="app-container">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          <TaskList />
        )}
      </div>
    </div>
  );
}

export default App;