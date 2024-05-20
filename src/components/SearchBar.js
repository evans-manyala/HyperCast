import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query) {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar input-group">
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city or zip code"
      />
      <button className="btn btn-primary" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
