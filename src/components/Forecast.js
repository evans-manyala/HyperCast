import React from 'react';
import './Forecast.css';

const Forecast = ({ forecast }) => (
  <div className="forecast">
    <h3>3-Day Forecast</h3>
    <div className="forecast-container">
      {forecast.map((day, index) => (
        <div key={index} className="forecast-day">
          <h4>{day.date}</h4>
          <div className="forecast-times">
            {['morning', 'afternoon', 'evening', 'night'].map((timeOfDay) => (
              <div key={timeOfDay} className="forecast-time">
                <h5>{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</h5>
                {day[timeOfDay] ? (
                  <div>
                    <p>Temp: {day[timeOfDay].main?.temp || 'N/A'}°C</p>
                    <p>Clouds: {day[timeOfDay].clouds?.all || 'N/A'}%</p>
                  </div>
                ) : (
                  <p>No data</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Forecast;
