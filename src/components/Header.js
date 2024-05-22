import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = ({ useCurrentLocation, setUseCurrentLocation }) => {
  return (
    <header className="header">
      <img src={logo} alt="HyperCast Logo" className="logo" />
      <div className="use-location">
        <input
          type="checkbox"
          checked={useCurrentLocation}
          onChange={(e) => setUseCurrentLocation(e.target.checked)}
        />
        <label>Use Current Location</label>
      </div>
    </header>
  );
};

export default Header;
