import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, error }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    onSearch(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className={error ? 'search-error' : ''}
        placeholder={error ? 'Enter a location' : 'Search for a city...'}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
