import React from 'react';

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast">
      <h3>3-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'long' })}</p>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="weather icon" />
            <p>{day.weather[0].description}</p>
            <p>High: {day.main.temp_max}°C</p>
            <p>Low: {day.main.temp_min}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
