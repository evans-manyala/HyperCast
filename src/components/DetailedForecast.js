import React from 'react';
import './DetailedForecast.css';

const DetailedForecast = ({ forecast }) => {
  return (
    <div className="detailed-forecast">
      <h2>Detailed Forecast</h2>
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Temp (°C)</th>
            <th>Weather</th>
            <th>Cloud Cover (%)</th>
            <th>Wind Speed (m/s)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
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

export default DetailedForecast;
