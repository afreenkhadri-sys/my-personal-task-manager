import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMockWeather, setIsMockWeather] = useState(false);

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.length - tasks.filter(t => t.completed).length
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getMockWeather = () => ({
    temperature: 24,
    condition: 'Sunny',
    icon: '☀️',
    windSpeed: 8,
    description: 'Clear skies with a mild breeze.'
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      navigate('/login');
      return;
    }
    const userName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
    setUser(userName);

    const fetchRealWeather = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        if (!response.ok) throw new Error('Weather API failed');
        const data = await response.json();
        const code = data.current_weather.weathercode;
        let cond = 'Clear';
        if (code === 0) cond = 'Sunny';
        else if (code >= 1 && code <= 3) cond = 'Partly Cloudy';
        else if (code >= 45 && code <= 48) cond = 'Foggy';
        else if (code >= 51 && code <= 67) cond = 'Rainy';
        else if (code >= 71 && code <= 77) cond = 'Snowy';
        else cond = 'Cloudy';

        setWeather({
          temperature: data.current_weather.temperature,
          condition: cond,
          windSpeed: data.current_weather.windspeed,
          icon: getIcon(cond)
        });
        setIsMockWeather(false);
      } catch (err) {
        setIsMockWeather(true);
        setWeather(getMockWeather());
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchRealWeather(pos.coords.latitude, pos.coords.longitude),
        () => { setIsMockWeather(true); setWeather(getMockWeather()); setLoading(false); }
      );
    } else {
      setIsMockWeather(true);
      setWeather(getMockWeather());
      setLoading(false);
    }
  }, [navigate]);

  const getIcon = (cond) => {
    const icons = { 'Sunny': '☀️', 'Partly Cloudy': '⛅', 'Cloudy': '☁️', 'Rainy': '🌧️', 'Snowy': '❄️', 'Foggy': '🌫️' };
    return icons[cond] || '🌤️';
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ margin: 0, color: '#2c3e50' }}>Welcome back, <span style={{ color: '#3498db' }}>{user}</span>!</h1>
          <p style={{ margin: '5px 0 0', color: '#7f8c8d' }}>Here is what is happening today.</p>
        </div>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderLeft: '5px solid #3498db' }}>
          <h3>Local Weather</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: '50px' }}>{weather?.icon}</span>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{weather?.temperature}°C</div>
                  <div>{weather?.condition}</div>
                  <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Wind: {weather?.windSpeed} km/h</div>
                </div>
              </div>
              {/* sshows mock message when location is blocked */}
              {isMockWeather && (
                <div style={{ fontSize: '11px', color: '#d35400', marginTop: '10px', fontStyle: 'italic' }}>
                  * Geolocation disabled. Showing demo weather data.
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', borderLeft: '5px solid #27ae60' }}>
          <h3>Task Statistics</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>{taskStats.total}</div><div style={{ fontSize: '12px' }}>Total</div></div>
            <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>{taskStats.completed}</div><div style={{ fontSize: '12px' }}>Done</div></div>
            <div><div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f39c12' }}>{taskStats.pending}</div><div style={{ fontSize: '12px' }}>Pending</div></div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>My Tasks</h2>
          <button onClick={() => navigate('/tasks')} style={{ padding: '8px 15px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>+ Manage Tasks</button>
        </div>

        {tasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#7f8c8d', padding: '20px' }}>
            No tasks found. Click "Manage Tasks" to add some!
          </p>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {tasks.map(task => (
              <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                  />
                  <span
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#bdc3c7' : '#2c3e50',
                      marginLeft: '8px',
                      flex: 1
                    }}
                  >
                    {task.text}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {/* cColor-coded priorities: High = red, Medium = orange, Low = green */}
                  <span
                    style={{
                      fontSize: '12px',
                      padding: '3px 8px',
                      borderRadius: '10px',
                      color:
                        task.priority === 'High'
                          ? '#e74c3c'
                          : task.priority === 'Medium'
                          ? '#f39c12'
                          : '#27ae60',
                      backgroundColor:
                        task.priority === 'High'
                          ? '#fdeaea'
                          : task.priority === 'Medium'
                          ? '#fdf2e9'
                          : '#e8f5e9',
                      fontWeight: 'bold'
                    }}
                  >
                    {task.priority}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
