import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);

  const handleSearch = () => {
    if (query.trim() === '') {
      setError(true);
    } else {
      setError(false);
      onSearch(query);
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={error ? 'Enter a location' : 'Search for a location...'}
        className={`search-input ${error ? 'error shake' : ''}`}
        onAnimationEnd={() => setError(false)}
      />
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
