import React from 'react';
import logo from '../assets/logo.png'; // Replace with your actual logo path

const Header = () => {
  return (
    <header className="app-header">
      <img src={logo} alt="HyperCast Logo" className="app-logo" />
      <h1>HyperCast</h1>
    </header>
  );
};

export default Header;
