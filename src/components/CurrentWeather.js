import React, { useMemo } from 'react';
import './CurrentWeather.css';

const calculateLocalTime = (timezoneOffset) => {
  const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
  const localTime = new Date(utcTime + timezoneOffset * 1000);
  return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const CurrentWeather = ({ weather }) => {
  const iconUrl = useMemo(() => {
    if (!weather) return null;
    return `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
  }, [weather]);

  const localTime = useMemo(() => {
    if (!weather) return null;
    return calculateLocalTime(weather.timezone);
  }, [weather]);

  if (!weather) return null;

  return (
    <div className="current-weather">
      <div className="current-weather-card">
        <h2>Current Weather</h2>
        <img 
          src={iconUrl} 
          alt={weather.weather[0].description} 
          onError={(e) => { e.target.onerror = null; e.target.src = '/src/components/assets/Error.png'; }}
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
