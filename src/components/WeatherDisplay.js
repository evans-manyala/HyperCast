import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  return (
    <div>
      <h2>Weather in {weather.location}</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Feels Like: {weather.feelsLikeTemp}°C</p>
      <p>{weather.weatherDesc}</p>
      <img src={weather.iconUrl} alt="weather icon" />
    </div>
  );
};

export default WeatherDisplay;
