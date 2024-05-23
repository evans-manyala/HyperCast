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
      <table>
        <thead>
          <tr>
            <th>Period</th>
            <th>Temp (°C)</th>
            <th>Weather</th>
            <th>Cloud Cover (%)</th>
            <th>Wind Speed (m/s)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {filteredForecast.map((item, index) => (
            <tr key={index}>
              <td>{getPeriod(item.date)}</td>
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
