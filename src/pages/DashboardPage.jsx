import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import WeatherWidget from '../components/WeatherWidget.jsx'

export default function DashboardPage() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const email = localStorage.getItem('userEmail') || ''
    if (email) {
      const firstPart = email.split('@')[0]
      setName(firstPart.charAt(0).toUpperCase() + firstPart.slice(1))
    } else {
      navigate('/')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    navigate('/')
  }

  return (
    <div className="dashboard-page">
      <header>
        <h1>Good morning, {name}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main>
             <div className="summary-cards">
          {(() => {
            const summary = localStorage.getItem('taskSummary')
            if (!summary) return null
            const { total, completed, pending } = JSON.parse(summary)
            return (
              <>
                <div className="card">
                  <h3>Total Tasks</h3>
                  <p>{total}</p>
                </div>
                <div className="card">
                  <h3>Completed</h3>
                  <p>{completed}</p>
                </div>
                <div className="card">
                  <h3>Pending</h3>
                  <p>{pending}</p>
                </div>
              </>
            )
          })()}
        </div>


        <WeatherWidget />

        <button onClick={() => navigate('/tasks')}>Go to Tasks</button>
      </main>
    </div>
  )
}
