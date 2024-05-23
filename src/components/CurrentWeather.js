import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ weather }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <div className="current-weather">
      <h2>Current Weather</h2>
      <div className="weather-info">
        <div className="weather-icon">
          <img src={iconUrl} alt={weather.weather[0].description} />
        </div>
        <div className="weather-details">
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
