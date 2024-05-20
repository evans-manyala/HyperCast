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
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (query) => {
    try {
      setError(null); // Reset error state before fetching
      setLoading(true); // Set loading to true before fetching
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
      setLoading(false); // Set loading to false after fetching
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
      setLoading(false); // Set loading to false if there is an error
    }
  };

  return (
    <div className="App container">
      <SearchBar onSearch={fetchWeather} />
      {loading && <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>}
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
