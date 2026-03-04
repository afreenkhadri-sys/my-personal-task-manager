import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('date');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => setTasks(prev => [newTask, ...prev]);

  const toggleTask = (id) => setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const deleteTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const filteredTasks = tasks
    .filter(task => (filter === 'completed' ? task.completed : filter === 'active' ? !task.completed : true))
    .filter(task => (categoryFilter === 'all' ? true : task.category === categoryFilter))
    .sort((a, b) => (sort === 'priority' ? ({ High:0, Medium:1, Low:2 }[a.priority] - { High:0, Medium:1, Low:2 }[b.priority]) : new Date(b.createdAt) - new Date(a.createdAt)));

  const categories = [...new Set(tasks.map(t => t.category))];

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/login', { replace: true });
  };

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h2>Your Tasks</h2>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      <TaskForm onAdd={addTask} />

      <div className="filters">
        <div>
          <label>Filter by status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Filter by category:</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="date">Date (Newest First)</option>
            <option value="priority">Priority (High to Low)</option>
          </select>
        </div>
      </div>

      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <li className="empty-state">No tasks found. Add one above!</li>
        ) : (
          filteredTasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`} style={{ borderLeft: `4px solid ${getPriorityColor(task.priority)}` }}>
              <div className="task-content">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                <div>
                  <strong>{task.title}</strong>
                  {task.description && <p className="description">{task.description}</p>}
                  <div className="task-meta">
                    <span className="priority" style={{ color: getPriorityColor(task.priority) }}>{task.priority}</span>
                    <span className="category">{task.category}</span>
                    <span className="date">{new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => deleteTask(task.id)} className="delete-btn">✕</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export const getPriorityColor = (priority) => {
  const colors = { High: '#ff4444', Medium: '#ffbb33', Low: '#00C851' };
  return colors[priority] || '#ccc';
};
