import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, useCurrentLocation, setUseCurrentLocation }) => {
  const [query, setQuery] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSearch = () => {
    if (!query && !useCurrentLocation) {
      setInputError('Enter a location');
      return;
    }
    setInputError('');
    onSearch(query);
  };

  const handleCheckboxChange = () => {
    setUseCurrentLocation(!useCurrentLocation);
    setQuery('');
    setInputError('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={inputError || "Enter location"}
        className={`search-input ${inputError ? 'error' : ''}`}
        disabled={useCurrentLocation}
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      <div className="location-checkbox">
        <input
          type="checkbox"
          id="use-current-location"
          checked={useCurrentLocation}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="use-current-location">Use Current Location</label>
      </div>
    </div>
  );
};

export default SearchBar;
