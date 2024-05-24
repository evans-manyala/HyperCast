import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSearch = () => {
    if (query.trim() === '') {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setError(false);
      onSearch(query);
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

  const onSuggestionsFetchRequested = async ({ value }) => {
    console.log('Fetching suggestions for:', value); // Log the search query
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: value,
          key: process.env.REACT_APP_OPENCAGE_API_KEY,
          limit: 5,
        },
      });
      console.log('API Response:', response.data); // Log the API response
      const citySuggestions = response.data.results.map(result => result.formatted);
      setSuggestions(citySuggestions);
    } catch (error) {
      console.error('Error fetching city suggestions:', error); // Log any errors
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
    </div>
  );

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
