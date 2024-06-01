// src/components/SplashScreen.js
import React from 'react';
import logo from '../assets/logo.png';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src={logo} alt="HyperCast Logo" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
