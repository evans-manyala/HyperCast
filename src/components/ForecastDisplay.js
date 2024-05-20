import React from 'react';

const ForecastDisplay = ({ forecast }) => {
  if (!forecast) return null;

  return (
    <div>
      <h3>3-Day Forecast</h3>
      <ul>
        {forecast.map((day, index) => (
          <li key={index}>
            Day {day.day}: High {day.high}°C, Low {day.low}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForecastDisplay;
