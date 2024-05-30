import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import LocationInfo from './components/LocationInfo';
import CurrentWeather from './components/CurrentWeather';
import SummaryForecast from './components/SummaryForecast';
import DetailedForecast from './components/DetailedForecast';
import ErrorDisplay from './components/ErrorDisplay';
import Header from './components/Header';
import useTheme from './hooks/useTheme';
import ToggleSwitch from './components/ToggleSwitch';
import './styles/styles.css';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);

  const [theme, setTheme] = useTheme();

  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const cities = useMemo(() => ['Nairobi', 'London', 'New York', 'Tokyo', 'Sydney', 'Paris', 'Berlin', 'Moscow'], []);

  const getRandomCity = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  }, [cities]);

  const fetchWeather = useCallback(async (query) => {
    try {
      setError(null);
      setLoading(true);

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${weatherApiKey}`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${weatherApiKey}`
      );

      setLocation(`${weatherResponse.data.name}, ${weatherResponse.data.sys.country}`);
      setWeatherData(weatherResponse.data);

      const forecast = forecastResponse.data.list.map(item => ({
        date: item.dt_txt,
        temp: item.main.temp,
        weather: item.weather[0].main,
        weatherIcon: item.weather[0].icon,
        cloudCover: item.clouds.all,
        windSpeed: item.wind.speed,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
      }));
      setForecastData(forecast);

      setLoading(false);
    } catch (err) {
      setError('Unable to fetch weather data. Please try again or check name of the location.');
      setLoading(false);
    }
  }, [weatherApiKey]);

  useEffect(() => {
    const fetchInitialWeather = async () => {
      const city = getRandomCity();
      await fetchWeather(city);
    };

    fetchInitialWeather();
  }, [fetchWeather, getRandomCity]);

  const handleSearch = async (query) => {
    if (!query) {
      setError('Please enter a city or location');
      return;
    }
    await fetchWeather(query);
  };

  const handleShowDetailed = () => {
    setShowDetailed(!showDetailed);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App container ${theme}`}>
      <Header />
      <div className="toggle-container">
        <ToggleSwitch
          id="theme-toggle"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          label={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          showCaption={false}
        />
        <ToggleSwitch
          id="detailed-toggle"
          checked={showDetailed}
          onChange={handleShowDetailed}
          label="Detailed Forecast"
        />
      </div>
      <div className="search-container">
        <SearchBar onSearch={handleSearch} error={error} />
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <ErrorDisplay message={error} />}
      {weatherData && (
        <>
          <LocationInfo location={location} />
          <CurrentWeather weather={weatherData} />
          {showDetailed ? (
            <DetailedForecast forecast={forecastData} />
          ) : (
            <SummaryForecast forecast={forecastData} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
