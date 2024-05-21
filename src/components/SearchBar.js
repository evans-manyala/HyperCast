import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) {
      setInputError(true);
      return;
    }
    setInputError(false);
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className={`search-input ${inputError ? 'input-error' : ''}`}
        placeholder="Enter location or Zip code"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setInputError(false)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {inputError && <p className="error-message">Please enter a location.</p>}
    </div>
  );
};

export default SearchBar;
