import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import LocationInfo from './components/LocationInfo';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import ErrorDisplay from './components/ErrorDisplay';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (query) => {
    if (!query) {
      setError('Location cannot be empty.');
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${apiKey}`
      );

      setLocation(`${weatherResponse.data.name}, ${weatherResponse.data.sys.country}`);
      setWeatherData(weatherResponse.data);

      const forecast = forecastResponse.data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
      setForecastData(forecast);

      setLoading(false);
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  const fetchDefaultLocationWeather = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setError(null);
          setLoading(true);
          const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );

          const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );

          setLocation(`${weatherResponse.data.name}, ${weatherResponse.data.sys.country}`);
          setWeatherData(weatherResponse.data);

          const forecast = forecastResponse.data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
          setForecastData(forecast);

          setLoading(false);
        } catch (err) {
          setError('Unable to fetch weather data. Please try again.');
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to retrieve your location. Please search manually.');
      }
    );
  }, []);

  useEffect(() => {
    fetchDefaultLocationWeather();
  }, [fetchDefaultLocationWeather]);

  return (
    <div className="App container">
      <Header />
      <div className="main-content">
        <SearchBar onSearch={fetchWeather} />
        {error && <ErrorDisplay message={error} />}
        {weatherData && <LocationInfo location={location} />}
        {loading && (
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        )}
        {weatherData && (
          <>
            <CurrentWeather weather={weatherData} />
            <Forecast forecast={forecastData} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
