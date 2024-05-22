import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ weather }) => {
  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return 'wi-thunderstorm';
    if (weatherId >= 300 && weatherId < 500) return 'wi-sprinkle';
    if (weatherId >= 500 && weatherId < 600) return 'wi-rain';
    if (weatherId >= 600 && weatherId < 700) return 'wi-snow';
    if (weatherId >= 700 && weatherId < 800) return 'wi-fog';
    if (weatherId === 800) return 'wi-day-sunny';
    if (weatherId > 800) return 'wi-cloudy';
    return 'wi-na';
  };

  const weatherIconClass = getWeatherIcon(weather.weather[0].id);

  return (
    <div className="current-weather">
      <h2>Current Weather</h2>
      <div className="weather-icon">
        <i className={`wi ${weatherIconClass}`} />
      </div>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Feels Like: {weather.main.feels_like}°C</p>
      <p>{weather.weather[0].description}</p>
    </div>
  );
};

export default CurrentWeather;
