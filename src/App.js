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

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = useCallback(async (query, isCoords = false) => {
    try {
      setError(null);
      setLoading(true);

      let weatherResponse;
      let forecastResponse;

      if (isCoords) {
        const { lat, lon } = query;
        weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
      } else {
        weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
        );

        forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${apiKey}`
        );
      }

      setLocation(`${weatherResponse.data.name}, ${weatherResponse.data.sys.country}`);
      setWeatherData(weatherResponse.data);

      const forecast = forecastResponse.data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
      setForecastData(forecast);

      setLoading(false);
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    const fetchDefaultLocationWeather = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather({ lat: latitude, lon: longitude }, true);
        },
        (error) => {
          console.error('Error fetching default location:', error);
          // Default to a specific location if geolocation fails (e.g., New York City)
          fetchWeather({ lat: 40.7128, lon: -74.0060 }, true);
        }
      );
    };

    fetchDefaultLocationWeather();
    const intervalId = setInterval(fetchDefaultLocationWeather, 3600000); // Refresh every hour (3600000 ms)
    return () => clearInterval(intervalId);
  }, [fetchWeather]);

  return (
    <div className="App container">
      <Header />
      <SearchBar onSearch={(query) => fetchWeather(query, false)} />
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
