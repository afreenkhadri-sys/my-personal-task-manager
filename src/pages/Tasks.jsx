import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');

  // Load tasks on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask,
      priority: priority,
      completed: false
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <button 
        onClick={() => navigate('/dashboard')}
        style={{ marginBottom: '20px', cursor: 'pointer', padding: '5px 10px' }}
      >
        &larr; Back to Dashboard
      </button>

      <h1>My Tasks</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ flex: 1, padding: '10px' }}
        />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: '10px' }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', background: '#28a745', color: 'white', border: 'none' }}>
          Add
        </button>
      </form>

      {/* Task List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '15px',
            borderBottom: '1px solid #eee',
            background: task.completed ? '#f9f9f9' : 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTask(task.id)}
                style={{ cursor: 'pointer', width: '20px', height: '20px' }}
              />
              <div>
                <span style={{ 
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#888' : 'black',
                  fontSize: '18px',
                  display: 'block'
                }}>
                  {task.text}
                </span>
                <small style={{ 
                  color: task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green',
                  fontWeight: 'bold'
                }}>
                  {task.priority} Priority
                </small>
              </div>
            </div>
            
            <button 
              onClick={() => deleteTask(task.id)}
              style={{ 
                background: '#dc3545', 
                color: 'white', 
                border: 'none', 
                padding: '5px 10px', 
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
