import React, { useEffect, useRef, useState } from 'react';
import './DetailedForecast.css';
import TrendChart from './TrendChart/TrendChart';

const getTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const DetailedForecast = ({ forecast }) => {
  const [viewDays, setViewDays] = useState(1);
  const [currentDay, setCurrentDay] = useState('');
  const [fadeClass, setFadeClass] = useState('fade-in');
  const containerRef = useRef(null);
  const forecastRef = useRef([]);

  const days = [...new Set(forecast.map(item => item.date.split(' ')[0]))].slice(0, viewDays);
  const filteredForecast = forecast.filter(item => days.includes(item.date.split(' ')[0]));

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const scrollPosition = container.scrollTop;

      let newDay = currentDay;

      for (let i = 0; i < forecastRef.current.length; i++) {
        const dayElement = forecastRef.current[i];
        if (dayElement && dayElement.offsetTop <= scrollPosition + 100) {
          newDay = dayElement.dataset.day;
        }
      }

      if (newDay !== currentDay) {
        setFadeClass('fade-out');
        setTimeout(() => {
          setCurrentDay(newDay);
          setFadeClass('fade-in');
        }, 500);
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [currentDay]);

  useEffect(() => {
    // Set the initial day when component mounts
    if (days.length > 0) {
      setCurrentDay(new Date(days[0]).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }));
    }
  }, [viewDays, days]);

  return (
    <div className="detailed-forecast">
      <div className={`forecast-header ${fadeClass}`}>
        <h2>{currentDay || 'Detailed Forecast'}</h2>
      </div>
      <div className="forecast-buttons">
        <button onClick={() => setViewDays(1)}>1 Day</button>
        <button onClick={() => setViewDays(3)}>3 Days</button>
        <button onClick={() => setViewDays(5)}>5 Days</button>
      </div>
      <div className="table-container" ref={containerRef}>
        {days.map((day, index) => (
          <div
            key={day}
            ref={el => forecastRef.current[index] = el}
            data-day={new Date(day).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            className="day-forecast"
          >
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
        <TrendChart forecast={filteredForecast} />
      </div>
    </div>
  );
};

export default DetailedForecast;
