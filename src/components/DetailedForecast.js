import React from 'react';
import './DetailedForecast.css';

const DetailedForecast = ({ forecast }) => (
  <div className="detailed-forecast">
    <h3>Detailed Forecast</h3>
    {forecast.map((day, index) => (
      <div key={index} className="forecast-day">
        <h4>{day.date}</h4>
        {['morning', 'afternoon', 'evening', 'night'].map((timeOfDay) => (
          <div key={timeOfDay} className="forecast-time">
            <h5>{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</h5>
            {day[timeOfDay] ? (
              <ul>
                <li>Temperature: {day[timeOfDay].main?.temp || 'N/A'}°C</li>
                <li>Cloud Cover: {day[timeOfDay].clouds?.all || 'N/A'}%</li>
                <li>Wind Speed: {day[timeOfDay].wind?.speed || 'N/A'} m/s</li>
                <li>Pressure: {day[timeOfDay].main?.pressure || 'N/A'} hPa</li>
                <li>Humidity: {day[timeOfDay].main?.humidity || 'N/A'}%</li>
                <img src={`icons/${day[timeOfDay].weather[0].icon}.png`} alt="Weather icon" />
              </ul>
            ) : (
              <p>No data available</p>
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default DetailedForecast;
