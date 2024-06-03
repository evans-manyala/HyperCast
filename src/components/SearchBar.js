import React, { useState, useCallback, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  // Focus input on mount using callback ref
  const setFocusRef = useCallback((node) => {
    if (node) {
      node.focus();
    }
    inputRef.current = node;
  }, []);

  // Handle search functionality
  const handleSearch = useCallback(() => {
    if (query.trim() === '') {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setError(false);
      onSearch(query);
    }
  }, [query, onSearch]);

  // Handle key press (Enter)
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  // Handle input change
  const handleChange = useCallback((e, { newValue }) => {
    setQuery(newValue);
    if (error) {
      setError(false);
    }
  }, [error]);

  // Fetch suggestions from API
  const onSuggestionsFetchRequested = useCallback(async ({ value }) => {
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
  }, []);

  // Clear suggestions
  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestions([]);
  }, []);

  // Get suggestion value
  const getSuggestionValue = useCallback((suggestion) => `${suggestion.name}, ${suggestion.country}`, []);

  // Render suggestion
  const renderSuggestion = useCallback((suggestion) => (
    <div className="suggestion-content">
      {suggestion.name}, {suggestion.country}
    </div>
  ), []);

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
          ref: setFocusRef
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
