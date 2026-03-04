import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import './App.css';

function App() {
  const location = useLocation();

  // Hide header on login or root paths
  const isLoginPage = 
    location.pathname.includes('/login') || 
    location.pathname === '/' || 
    location.pathname === '/my-personal-task-manager' ||
    location.pathname === '/my-personal-task-manager/';

  return (
    <div className="app">
      {!isLoginPage && (
        <header className="header">
          <h1> My Personal Task Manager</h1>
          <nav className="nav">
            {/* Simple relative links */}
            <Link to="/tasks">Tasks</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </header>
      )}

      <main className="main">
        <Routes>
          {/* Base Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/*  Full Path Routes (Matches your current URL exactly) */}
          <Route path="/my-personal-task-manager/login" element={<Login />} />
          <Route path="/my-personal-task-manager/tasks" element={<Tasks />} />
          <Route path="/my-personal-task-manager/dashboard" element={<Dashboard />} />

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/my-personal-task-manager" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
