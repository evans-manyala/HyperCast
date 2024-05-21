import React from 'react';

const Forecast = ({ forecast }) => {
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="forecast">
      <h2>3-Day Forecast</h2>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <h3>{formatDate(day.dt_txt)}</h3>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
            <p>{Math.round(day.main.temp)}°C</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
