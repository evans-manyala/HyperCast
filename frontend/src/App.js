import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Preferences from './components/Preferences';
//import AppContent from './components/AppContent'; // Your main weather app content

import axios from 'axios';
import SearchBar from './components/SearchBar';
import LocationInfo from './components/LocationInfo';
import CurrentWeather from './components/CurrentWeather';
import SummaryForecast from './components/SummaryForecast';
import DetailedForecast from './components/DetailedForecast';
import ErrorDisplay from './components/ErrorDisplay';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SplashScreen from './components/SplashScreen';
import useTheme from './hooks/useTheme';
import ToggleSwitch from './components/ToggleSwitch';
import './styles/styles.css';
import './App.css';

// Main component for the weather application
const AppContent = ({ user }) => {
  // State variables for managing location, weather data, forecast data, status, detailed view, and theme
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [status, setStatus] = useState({ error: null, loading: false });
  const [showDetailed, setShowDetailed] = useState(false);
  const [theme, setTheme] = useTheme();

  // API endpoint for the backend server
  const backendApiUrl = process.env.REACT_APP_BACKEND_API_URL;

  // List of cities for random selection
  const cities = useMemo(() => ['Nairobi', 'London', 'New York', 'Tokyo', 'Sydney', 'Paris', 'Berlin', 'Moscow'], []);

  // Function to get a random city from the list
  const getRandomCity = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  }, [cities]);

  // Function to fetch weather data for a given query (city)
  const fetchWeather = useCallback(async (query) => {
    setStatus({ error: null, loading: true });
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(`${backendApiUrl}/api/weather/current?city=${query}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
        axios.get(`${backendApiUrl}/api/weather/forecast?city=${query}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
      ]);

      setLocation(`${weatherResponse.data.name}, ${weatherResponse.data.country}`);
      setWeatherData(weatherResponse.data);

      const forecast = forecastResponse.data.map(item => ({
        date: item.date,
        temp: item.temp,
        weather: item.weather,
        weatherIcon: item.weatherIcon,
        cloudCover: item.cloudCover,
        windSpeed: item.windSpeed,
        pressure: item.pressure,
        humidity: item.humidity,
      }));
      setForecastData(forecast);
    } catch (err) {
      setStatus({ error: 'Unable to fetch weather data. Please try again or check the name of the location.', loading: false });
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  }, [backendApiUrl, user.token]);

  // Fetch initial weather data for a random city when the component mounts
  useEffect(() => {
    const fetchInitialWeather = async () => {
      const city = getRandomCity();
      await fetchWeather(city);
    };
    fetchInitialWeather();
  }, [fetchWeather, getRandomCity]);

  // Handle search action and fetch weather data for the searched city
  const handleSearch = async (query) => {
    if (!query) {
      setStatus({ error: 'Please enter a city or location', loading: false });
      return;
    }
    await fetchWeather(query);
  };

  // Toggle detailed view of the forecast
  const handleShowDetailed = () => {
    setShowDetailed(!showDetailed);
  };

  // Toggle theme between dark and light modes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Apply the selected theme to the body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Render the main content of the app
  return (
    <div className={`App container ${theme}`}>
      <Header />
      <div className="search-container">
        <SearchBar onSearch={handleSearch} error={status.error} />
      </div>
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
      {status.loading && <div className="loading">Loading...</div>}
      {status.error && <ErrorDisplay message={status.error} />}
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

// Main App component with routing, login and splash screen handling
const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [user, setUser] = useState(null);

  // Display splash screen for 3 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        {showSplashScreen ? (
          <Route path="/" element={<SplashScreen />} />
        ) : (
          <>
            {!user ? (
              <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
              </>
              ) : (
              <>
              <Route path="/" element={<Navigate to="/landing" />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/app" element={<AppContent user={user} />} />
              <Route path="/preferences" element={<Preferences user={user} />} />
              </>
            )}
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
