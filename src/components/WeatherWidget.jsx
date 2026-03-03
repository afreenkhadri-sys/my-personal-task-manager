import { useState, useEffect } from 'react'

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  //  FAKE WEATHER BACKUP — shown if real weather fails bc not all browsers support geolocation (mine is blocked by default)
  const fallbackWeather = {
    temp: 22,
    condition: 'Sunny',
    message: 'Nice day — great for focus!'
  }

  useEffect(() => {
    let didCancel = false
    let fetchTimeout = null

    const getLocationAndFetch = () => {
      if (!navigator.geolocation) {
        finish()
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`

          const controller = new AbortController()
          fetchTimeout = setTimeout(() => controller.abort(), 8000)

          fetch(url, { signal: controller.signal })
            .then((res) => {
              if (!res.ok) throw new Error('Failed to load weather')
              return res.json()
            })
            .then((data) => {
              if (didCancel) return
              const cw = data.current_weather
              if (!cw) throw new Error('No current weather data')
              const temp = Math.round(cw.temperature)
              const code = cw.weathercode

              let condition = 'Sunny'
              if (code >= 45 && code <= 49) condition = 'Foggy'
              else if (code >= 51 && code <= 67) condition = 'Rainy'
              else if (code >= 71 && code <= 77) condition = 'Snowy'
              else if (code >= 80 && code <= 82) condition = 'Rainy'
              else if (code >= 85 && code <= 86) condition = 'Snowy'
              else if (code === 95 || code === 96 || code === 99) condition = 'Stormy'

              let message = 'Nice day — get things done!'
              if (condition === 'Rainy') message = 'Rainy day — perfect for indoor tasks!'
              else if (condition === 'Sunny') message = 'Sunny day — great for focus!'
              else if (condition === 'Stormy') message = 'Stormy weather — stay safe and plan ahead.'

              finish(() => setWeather({ temp, condition, message }))
            })
            .catch((err) => {
              if (didCancel) return
              finish()
            })
            .finally(() => {
              if (fetchTimeout) clearTimeout(fetchTimeout)
            })
        },
        (err) => {
          finish()
        },
        { timeout: 10000 }
      )
    }

    const finish = () => {
      if (didCancel) return
      setWeather(fallbackWeather)
      setLoading(false)
    }

    getLocationAndFetch()

    return () => {
      didCancel = true
    }
  }, [])

  if (loading) return <div className="weather-widget">Loading weather...</div>
  if (error) return <div className="weather-widget error">{error}</div>

  return (
    <div className="weather-widget">
      <h2>Today's Weather</h2>
      <p>
        <strong>{weather.temp}°C</strong>, {weather.condition}
      </p>
      <p>{weather.message}</p>
    </div>
  )
}
