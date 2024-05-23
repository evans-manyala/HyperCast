import React from 'react';
import './SummaryForecast.css';

const SummaryForecast = ({ weather }) => (
  <div className="summary-forecast">
    <h3>Today's Weather</h3>
    <div className="forecast-times">
      {['morning', 'afternoon', 'night'].map((timeOfDay) => (
        <div key={timeOfDay} className="forecast-time">
          <h5>{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</h5>
          {weather[timeOfDay] ? (
            <div>
              <p>Temp: {weather[timeOfDay].main?.temp || 'N/A'}°C</p>
              <p>Clouds: {weather[timeOfDay].clouds?.all || 'N/A'}%</p>
              <p>Wind: {weather[timeOfDay].wind?.speed || 'N/A'} m/s</p>
              <p>Pressure: {weather[timeOfDay].main?.pressure || 'N/A'} hPa</p>
              <p>Humidity: {weather[timeOfDay].main?.humidity || 'N/A'}%</p>
              <img src={`icons/${weather[timeOfDay].weather[0].icon}.png`} alt="Weather icon" />
            </div>
          ) : (
            <p>No data</p>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default SummaryForecast;
