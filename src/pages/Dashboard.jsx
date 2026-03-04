import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherWidget from '../components/WeatherWidget';
import { getPriorityColor } from './Tasks';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'User';

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/login', { replace: true });
  };

  const toggleTask = (id) => {
    const updated = tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t));
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {userEmail.split('@')[0]}!</h2>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      <section className="summary-cards">
        <div className="card">
          <h3>Total Tasks</h3>
          <p className="stat">{tasks.length}</p>
        </div>
        <div className="card">
          <h3>Completed</h3>
          <p className="stat">{tasks.filter(t => t.completed).length}</p>
        </div>
        <div className="card">
          <h3>Pending</h3>
          <p className="stat">{tasks.filter(t => !t.completed).length}</p>
        </div>
      </section>

      <section className="weather-widget">
        <WeatherWidget />
      </section>

      <section className="recent-tasks">
        <h3>Your Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add some in the Tasks page!</p>
        ) : (
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`} style={{ borderLeft: `4px solid ${getPriorityColor(task.priority)}` }}>
                <div className="task-content">
                  <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                  <div>
                    <strong>{task.title}</strong>
                    {task.description && <p className="description">{task.description}</p>}
                    <div className="task-meta">
                      <span className="priority" style={{ color: getPriorityColor(task.priority) }}>{task.priority}</span>
                      <span className="category">{task.category}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)} className="delete-btn">✕</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
