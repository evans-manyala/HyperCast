import React from 'react';
import './SummaryForecast.css';

const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long' };
  return date.toLocaleDateString(undefined, options);
};

const filterWeeklyForecast = (forecast) => {
  const daysOfWeek = forecast.reduce((acc, item) => {
    const day = getDayOfWeek(item.date);
    if (!acc[day]) {
      acc[day] = item;
    }
    return acc;
  }, {});
  return Object.values(daysOfWeek);
};

const SummaryForecast = ({ forecast }) => {
  const weeklyForecast = filterWeeklyForecast(forecast);

  return (
    <div className="summary-forecast">
      <h2>Weekly Summary Forecast</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Temp (°C)</th>
            <th>Weather</th>
            <th>Cloud Cover (%)</th>
            <th>Wind Speed (m/s)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {weeklyForecast.map((item, index) => (
            <tr key={index}>
              <td>{getDayOfWeek(item.date)}</td>
              <td>{item.temp}</td>
              <td>
                <img src={`http://openweathermap.org/img/wn/${item.weatherIcon}.png`} alt={item.weather} />
                {item.weather}
              </td>
              <td>{item.cloudCover}</td>
              <td>{item.windSpeed}</td>
              <td>{item.pressure}</td>
              <td>{item.humidity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryForecast;
