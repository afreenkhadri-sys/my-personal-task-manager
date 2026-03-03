import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <header>
        <h1>📝 Task Manager</h1>
      </header>
      <main>
        <Routes>
          <Route index element={<TasksPage />} />
        </Routes>
      </main>
    </div>
  );
}

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim() }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="tasks-page" style={{ padding: '1rem', fontFamily: 'system-ui' }}>
      <h2>Your Tasks</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          style={{ marginRight: '0.5rem', padding: '0.5rem', fontSize: '1rem' }}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button
          onClick={addTask}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          + Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>No tasks yet. Add one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li
              key={task.id}
              style={{
                padding: '0.5rem',
                margin: '0.25rem 0',
                backgroundColor: '#f9f9f9',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{task.text}</span>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f44336',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
