import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import LocationInfo from './components/LocationInfo';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import ErrorDisplay from './components/ErrorDisplay';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeather = async (query) => {
    try {
      setError(null); // Reset error state before fetching
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${apiKey}`
      );

      setLocation(`${weatherResponse.data.name}, ${weatherResponse.data.sys.country}`);
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data.list.slice(0, 3)); // Simple 3-day forecast
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="App">
      <SearchBar onSearch={fetchWeather} />
      {error && <ErrorDisplay message={error} />}
      {weatherData && (
        <>
          <LocationInfo location={location} />
          <CurrentWeather weather={weatherData} />
          <Forecast forecast={forecastData} />
        </>
      )}
    </div>
  );
};

export default App;
