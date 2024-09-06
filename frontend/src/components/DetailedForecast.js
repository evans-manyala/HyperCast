import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import './DetailedForecast.css';
import TrendChart from './TrendChart/TrendChart';

// Function to format date string to time
const getTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Component to display detailed weather forecast
const DetailedForecast = ({ forecast }) => {
  const [viewDays, setViewDays] = useState(1); // State to manage the number of days to view
  const [currentDay, setCurrentDay] = useState(''); // State to manage the current day displayed
  const [fadeClass, setFadeClass] = useState('fade-in'); // State to manage the fade-in/fade-out class
  const containerRef = useRef(null); // Ref to the container element for scrolling
  const forecastRef = useRef([]); // Ref to store forecast day elements

  // Memoized array of unique days in the forecast limited by viewDays
  const days = useMemo(() => 
    [...new Set(forecast.map(item => item.date.split(' ')[0]))].slice(0, viewDays),
    [forecast, viewDays]
  );

  // Memoized filtered forecast for the selected days
  const filteredForecast = useMemo(() => 
    forecast.filter(item => days.includes(item.date.split(' ')[0])),
    [forecast, days]
  );

  // Effect to handle scrolling and updating currentDay
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const scrollPosition = container.scrollTop;

      let newDay = currentDay;

      // Update the current day based on scroll position
      forecastRef.current.forEach(dayElement => {
        if (dayElement && dayElement.offsetTop <= scrollPosition + 100) {
          newDay = dayElement.dataset.day;
        }
      });

      // Update the currentDay state with fade-in/out effect
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

  // Effect to set the initial currentDay based on the first day in the list
  useEffect(() => {
    if (days.length > 0) {
      setCurrentDay(new Date(days[0]).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }));
    }
  }, [days]);

  // Handler to change the number of view days
  const handleViewDaysChange = useCallback((days) => {
    setViewDays(days);
  }, []);

  // Component to render the forecast for a single day
  const DayForecast = ({ day, items }) => (
    <div
      key={day}
      ref={el => forecastRef.current.push(el)}
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
            {items.map((item, index) => (
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
  );

  return (
    <div className="detailed-forecast">
      <div className={`forecast-header ${fadeClass}`}>
        <h2>{currentDay || 'Detailed Forecast'}</h2>
      </div>
      <div className="forecast-buttons">
        <button onClick={() => handleViewDaysChange(1)}>1 Day</button>
        <button onClick={() => handleViewDaysChange(3)}>3 Days</button>
        <button onClick={() => handleViewDaysChange(5)}>5 Days</button>
      </div>
      <div className="table-container" ref={containerRef}>
        {days.map(day => (
          <DayForecast key={day} day={day} items={filteredForecast.filter(item => item.date.startsWith(day))} />
        ))}
        <TrendChart forecast={filteredForecast} />
      </div>
    </div>
  );
};

export default DetailedForecast;
