import React from 'react';
import './SummaryForecast.css';

const getPeriod = (dateString) => {
  const hour = new Date(dateString).getHours();
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Night';
};

const filterForecast = (forecast) => {
  const periods = ['Morning', 'Afternoon', 'Night'];
  const filtered = forecast.reduce((acc, item) => {
    const period = getPeriod(item.date);
    if (!acc[period]) acc[period] = item;
    return acc;
  }, {});
  return periods.map(period => filtered[period]).filter(Boolean);
};

const SummaryForecast = ({ forecast }) => {
  const filteredForecast = filterForecast(forecast);

  return (
    <div className="summary-forecast">
      <h2>Summary Forecast</h2>
      <div className="forecast-container">
        {filteredForecast.map((item, index) => (
          <div key={index} className="forecast-slot">
            <h3>{getPeriod(item.date)}</h3>
            <p>{item.temp}°C</p>
            <div className="weather-info">
              <img src={`http://openweathermap.org/img/wn/${item.weatherIcon}.png`} alt={item.weather} />
              <p>{item.weather}</p>
            </div>
            <p>Cloud Cover: {item.cloudCover}%</p>
            <p>Wind: {item.windSpeed} m/s</p>
            <p>Pressure: {item.pressure} hPa</p>
            <p>Humidity: {item.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryForecast;
