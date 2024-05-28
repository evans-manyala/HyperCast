import React, { useState, useEffect, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: value,
          key: process.env.REACT_APP_OPENCAGE_API_KEY,
          limit: 5,
        },
      });
      const citySuggestions = response.data.results.map(result => ({
        name: result.components.city || result.components.town || result.components.village || result.components.state || result.formatted,
        country: result.components.country,
      }));
      setSuggestions(citySuggestions);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => `${suggestion.name}, ${suggestion.country}`;

  const renderSuggestion = (suggestion) => (
    <div className="suggestion-content">
      {suggestion.name}, {suggestion.country}
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
          className: error ? 'search-error' : '',
          ref: inputRef
        }}
        theme={{
          suggestionsContainer: 'react-autosuggest__suggestions-container',
          suggestion: 'react-autosuggest__suggestion',
          suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
