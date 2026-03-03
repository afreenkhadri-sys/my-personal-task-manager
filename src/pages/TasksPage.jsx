import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm.jsx'

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const [category, setCategory] = useState('all') // 'all', 'Work', 'Personal', 'Shopping'
  const [sort, setSort] = useState('priority') // 'priority', 'date'

  const navigate = useNavigate()

  // Loadd tasks from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      try {
        setTasks(JSON.parse(saved))
      } catch (e) {
        setTasks([])
      }
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks([task, ...tasks])
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Filter and sort tasks
  let filteredTasks = [...tasks]

  if (filter === 'active') {
    filteredTasks = filteredTasks.filter((t) => !t.completed)
  } else if (filter === 'completed') {
    filteredTasks = filteredTasks.filter((t) => t.completed)
  }

  if (category !== 'all') {
    filteredTasks = filteredTasks.filter((t) => t.category === category)
  }

  if (sort === 'date') {
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else {
    // Sort by priority: High > Medium > Low
    const priorityOrder = { High: 0, Medium: 1, Low: 2 }
    filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  }

  // Summary counts
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed

  // Update dashboard summary cards (optional but nice)
  useEffect(() => {
    // store summary in localStorage so dashboard can read it
    localStorage.setItem(
      'taskSummary',
      JSON.stringify({ total, completed, pending })
    )
  }, [total, completed, pending])

  return (
    <div className="tasks-page">
      <header>
        <h1>Your Tasks</h1>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </header>

      <TaskForm onAdd={addTask} />

      <div className="filters">
        <label>
          Filter by status:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label>
          Filter by category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
          </select>
        </label>

        <label>
          Sort by:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="priority">Priority</option>
            <option value="date">Date Added</option>
          </select>
        </label>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span>Priority: {task.priority}</span>
                  <span>Category: {task.category}</span>
                </div>
              </div>
              <div className="task-actions">
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
