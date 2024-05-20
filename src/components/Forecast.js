import React from 'react';

const Forecast = ({ forecast }) => {
  const getDay = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  const forecastDays = forecast.reduce((acc, current) => {
    const day = getDay(current.dt_txt);
    if (!acc.some(forecast => getDay(forecast.dt_txt) === day)) {
      acc.push(current);
    }
    return acc;
  }, []).slice(0, 3); // Get the next 3 unique days

  return (
    <div className="forecast-list">
      {forecastDays.map((day) => (
        <div className="forecast-day" key={day.dt}>
          <h3>{getDay(day.dt_txt)}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
          <p>{Math.round(day.main.temp_max)}°C / {Math.round(day.main.temp_min)}°C</p>
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
