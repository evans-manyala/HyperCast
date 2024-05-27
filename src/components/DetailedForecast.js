import React from 'react';
import './DetailedForecast.css';

const getTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const DetailedForecast = ({ forecast }) => {
  const days = [...new Set(forecast.map(item => item.date.split(' ')[0]))];
  const filteredForecast = forecast.filter(item => days.includes(item.date.split(' ')[0]));

  return (
    <div className="detailed-forecast">
      <h2>Detailed Forecast</h2>
      {days.map(day => (
        <div key={day} className="day-forecast">
          <h3>{new Date(day).toDateString()}</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Temp (°C)</th>
                  <th>Weather</th>
                  <th>Cloud Cover (%)</th>
                  <th>Wind Speed (m/s)</th>
                  <th>Pressure (hPa)</th>
                  <th>Humidity (%)</th>
                </tr>
              </thead>
              <tbody>
                {filteredForecast.filter(item => item.date.startsWith(day)).map((item, index) => (
                  <tr key={index}>
                    <td>{getTime(item.date)}</td>
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
        </div>
      ))}
    </div>
  );
};

export default DetailedForecast;
