import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import LocationInfo from './components/LocationInfo';
import CurrentWeather from './components/CurrentWeather';
import SummaryForecast from './components/SummaryForecast';
import DetailedForecast from './components/DetailedForecast';
import ErrorDisplay from './components/ErrorDisplay';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetailedForecast, setShowDetailedForecast] = useState(false);
  const [defaultCities, setDefaultCities] = useState([]);

  const fetchWeather = async (query) => {
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

      const forecast = processForecastData(forecastResponse.data.list);
      setForecastData(forecast);

      setLoading(false);
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  const fetchDefaultCitiesWeather = useCallback(async () => {
    const cities = ['Nairobi', 'London', 'New York'];
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    try {
      const promises = cities.map(city =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        )
      );

      const responses = await Promise.all(promises);
      const citiesData = responses.map(res => ({
        name: res.data.name,
        country: res.data.sys.country,
        weather: res.data,
      }));

      setDefaultCities(citiesData);
    } catch (err) {
      console.error('Error fetching default cities weather data', err);
    }
  }, []);

  const processForecastData = (data) => {
    const groupedData = data.reduce((acc, item) => {
      const date = new Date(item.dt_txt).toLocaleDateString();
      if (!acc[date]) acc[date] = { morning: null, afternoon: null, evening: null, night: null };

      const hour = new Date(item.dt_txt).getHours();
      if (hour >= 6 && hour < 12) acc[date].morning = item;
      else if (hour >= 12 && hour < 18) acc[date].afternoon = item;
      else if (hour >= 18 && hour < 24) acc[date].evening = item;
      else if (hour >= 0 && hour < 6) acc[date].night = item;

      return acc;
    }, {});

    return Object.keys(groupedData).map(date => ({ date, ...groupedData[date] }));
  };

  useEffect(() => {
    fetchDefaultCitiesWeather();
  }, [fetchDefaultCitiesWeather]);

  return (
    <div className="App container">
      <Header />
      <SearchBar onSearch={fetchWeather} />
      {loading && <div className="loading">Loading...</div>}
      {error && <ErrorDisplay message={error} />}
      <div className="default-cities">
        <h3>Default Cities Weather</h3>
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Condition</th>
              <th>Wind Speed</th>
              <th>Humidity</th>
            </tr>
          </thead>
          <tbody>
            {defaultCities.map(city => (
              <tr key={city.name}>
                <td>{city.name}, {city.country}</td>
                <td>{city.weather.main.temp}°C</td>
                <td><img src={`icons/${city.weather.weather[0].icon}.png`} alt="Weather icon" /> {city.weather.weather[0].description}</td>
                <td>{city.weather.wind.speed} m/s</td>
                <td>{city.weather.main.humidity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {weatherData && (
        <>
          <LocationInfo location={location} />
          <CurrentWeather weather={weatherData} />
          <SummaryForecast weather={forecastData[0]} />
          <div>
            <label>
              <input
                type="checkbox"
                checked={showDetailedForecast}
                onChange={() => setShowDetailedForecast(!showDetailedForecast)}
              />
              Show Detailed Forecast
            </label>
          </div>
          {showDetailedForecast && <DetailedForecast forecast={forecastData.slice(0, 3)} />}
        </>
      )}
    </div>
  );
};

export default App;
