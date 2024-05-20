import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import './App.css';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (location) => {
    try {
      // Clear previous errors
      setError('');

      // Fetch current weather data
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7d8d5e257f8bab4168b422dcb4d5e6d7`
      );
      const weatherData = weatherResponse.data;

      // Map API response to our weather object
      const currentWeather = {
        location: weatherData.name,
        temperature: weatherData.main.temp,
        feelsLikeTemp: weatherData.main.feels_like,
        weatherDesc: weatherData.weather[0].description,
        iconUrl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
      };
      setWeather(currentWeather);

      // Fetch forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=7d8d5e257f8bab4168b422dcb4d5e6d7`
      );
      const forecastData = forecastResponse.data.list.slice(0, 3).map((item, index) => ({
        day: index + 1,
        high: item.main.temp_max,
        low: item.main.temp_min,
      }));
      setForecast(forecastData);

    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>HyperCast</h1>
      <SearchBar onSearch={handleSearch} />
      <ErrorDisplay error={error} />
      <WeatherDisplay weather={weather} />
      <ForecastDisplay forecast={forecast} />
    </div>
  );
};

export default App;
