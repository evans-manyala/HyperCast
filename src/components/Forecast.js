import React from 'react';
import './Forecast.css';

const Forecast = ({ forecast }) => {
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="forecast">
      <table className="forecast-table">
        <thead>
          <tr>
            {forecast.map((item, index) => (
              <th key={index}>{getDayName(item.dt_txt)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {forecast.map((item, index) => (
              <td key={index}>
                <p>{Math.round(item.main.temp)}°C</p>
                <p>{item.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Forecast;
