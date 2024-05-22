import React from 'react';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="HyperCast Logo" className="header-logo" />
    </header>
  );
};

export default Header;
