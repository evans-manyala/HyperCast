import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ weather }) => {
  if (!weather) {
    return null;
  }

  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  const calculateLocalTime = (timezoneOffset) => {
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + timezoneOffset * 1000);
    return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
  };

  const localTime = calculateLocalTime(weather.timezone);

  return (
    <div className="current-weather">
      <div className="current-weather-card">
        <h2>Current Weather</h2>
        <img 
          src={iconUrl} 
          alt={weather.weather[0].description} 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/path/to/default/icon.png'; // Path to your default/fallback icon
          }}
        />
        <div className="current-weather-details">
          <div>
            <span>{weather.main.temp}°C</span>
            <span>Temperature</span>
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
