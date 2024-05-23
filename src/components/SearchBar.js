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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (error) {
      setError(false);
    }
  };

  return (
    <div className={`search-bar ${error ? 'shake' : ''}`}>
      <input
        type="text"
        placeholder={error ? 'Please enter a location' : 'Enter location'}
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className={error ? 'search-error' : ''}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
