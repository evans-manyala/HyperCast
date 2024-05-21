import React from 'react';
import logo from '../assets/logo.png';


const Header = ({ onSearch }) => {
  return (
    <header className="header">
      <img src={logo} alt="HyperCast Logo" />
    </header>
  );
};

export default Header;
