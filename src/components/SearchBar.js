import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchSuggestions = async (value) => {
    if (value.length >= 3) {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&sort=population&cnt=5&appid=${apiKey}`);
      const data = await response.json();
      if (data && data.list) {
        const citySuggestions = data.list.map(city => ({
          name: city.name,
          country: city.sys.country
        }));
        setSuggestions(citySuggestions);
      }
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    fetchSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => `${suggestion.name}, ${suggestion.country}`;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name}, {suggestion.country}
    </div>
  );

  const handleSearch = async () => {
    if (query.trim() === '') {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`);
      const data = await response.json();
      if (data.cod === '404') {
        setError(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      } else {
        setError(false);
        onSearch(query);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (e, { newValue }) => {
    setQuery(newValue);
    if (error) {
      setError(false);
    }
  };

  return (
    <div className={`search-bar ${shake ? 'shake' : ''}`}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: error ? 'Please enter a location' : 'Enter location',
          value: query,
          onChange: handleChange,
          onKeyPress: handleKeyPress,
          className: error ? 'search-error' : ''
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
