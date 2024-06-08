import React, { useMemo } from 'react';
import './CurrentWeather.css';

// Function to calculate local time based on timezone offset
const calculateLocalTime = (timezoneOffset) => {
  const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000; // Calculate UTC time
  const localTime = new Date(utcTime + timezoneOffset * 1000); // Adjust for the timezone offset
  return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format local time
};

// Component to display current weather information
const CurrentWeather = ({ weather }) => {
  // Memoize the icon URL to avoid unnecessary recalculations
  const iconUrl = useMemo(() => {
    if (!weather) return null; // Return null if weather data is not available
    return `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`; // Generate icon URL
  }, [weather]);

  // Memoize the local time to avoid unnecessary recalculations
  const localTime = useMemo(() => {
    if (!weather) return null; // Return null if weather data is not available
    return calculateLocalTime(weather.timezone); // Calculate local time based on timezone offset
  }, [weather]);

  if (!weather) return null; // Return null if weather data is not available

  // Render the current weather information
  return (
    <div className="current-weather">
      <div className="current-weather-card">
        <h2>Current Weather</h2>
        <img 
          src={iconUrl} 
          alt={weather.weather[0].description} 
          onError={(e) => { e.target.onerror = null; e.target.src = '/src/components/assets/Error.png'; }} // Fallback image on error
        />
        <div className="current-weather-details">
          <div>
            <span>{weather.main.temp}°C</span>
            <span>Temp</span>
          </div>
          <div>
            <span>{weather.main.humidity}%</span>
            <span>Humidity</span>
          </div>
          <div>
            <span>{weather.wind.speed} m/s</span>
            <span>Wind Speed</span>
          </div>
          <div>
            <span>{weather.main.pressure} hPa</span>
            <span>Pressure</span>
          </div>
          <div>
            <span>{localTime}</span>
            <span>Local Time</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
