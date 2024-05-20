import React from 'react';

const CurrentWeather = ({ weather }) => {
  return (
    <div className="current-weather">
      <p>As of {new Date(weather.dt * 1000).toLocaleTimeString()}</p>
      <div className="weather-details">
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
        <div>
          <h3>{weather.main.temp}°C</h3>
          <p>Feels like: {weather.main.feels_like}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
