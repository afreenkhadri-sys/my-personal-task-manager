import { useState, useEffect } from 'react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const mockWeather = {
    temperature_2m: 24,
    weathercode: 1,
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if ('geolocation' in navigator) {
          try {
            const position = await new Promise((resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
            );
            const { latitude, longitude } = position.coords;

            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode&timezone=auto`
            );
            if (!res.ok) throw new Error('API error');
            const data = await res.json();
            setWeather(data.current);
          } catch (err) {
            console.warn('Geolocation failed, using mock weather:', err);
            setWeather(mockWeather);
          }
        } else {
          setWeather(mockWeather);
        }
      } catch (err) {
        setWeather(mockWeather);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherMessage = (code, temp) => {
    const conditions = {
      0: { emoji: '☀️', message: 'Sunny' },
      1: { emoji: '⛅', message: 'Partly cloudy' },
      2: { emoji: '☁️', message: 'Cloudy' },
      3: { emoji: '☁️', message: 'Overcast' },
      45: { emoji: '🌫️', message: 'Foggy' },
      48: { emoji: '🌫️', message: 'Foggy' },
      51: { emoji: '🌧️', message: 'Light drizzle' },
      53: { emoji: '🌧️', message: 'Drizzle' },
      55: { emoji: '🌧️', message: 'Heavy drizzle' },
      61: { emoji: '🌧️', message: 'Light rain' },
      63: { emoji: '🌧️', message: 'Rain' },
      65: { emoji: '🌧️', message: 'Heavy rain' },
      71: { emoji: '❄️', message: 'Light snow' },
      73: { emoji: '❄️', message: 'Snow' },
      75: { emoji: '❄️', message: 'Heavy snow' },
      80: { emoji: '🌧️', message: 'Light rain showers' },
      81: { emoji: '🌧️', message: 'Rain showers' },
      82: { emoji: '🌧️', message: 'Heavy rain showers' },
      95: { emoji: '⛈️', message: 'Thunderstorm' },
      96: { emoji: '⛈️', message: 'Thunderstorm with hail' },
      99: { emoji: '⛈️', message: 'Thunderstorm with heavy hail' },
    };

    const condition = conditions[code] || { emoji: '🌐', message: 'Unknown' };
    return `${condition.emoji} ${condition.message} (${temp}°C)`;
  };

  return (
    <div className="weather-widget">
      <h3>🌤️ Current Weather</h3>
      {loading ? <p>Loading weather...</p> : <p>{getWeatherMessage(weather.weathercode, weather.temperature_2m)}</p>}
      <small className="mock-note">
        {weather?.temperature_2m === 24 && weather?.weathercode === 1 ? 'Mock weather shown (geolocation not available)' : ''}
      </small>
    </div>
  );
}
