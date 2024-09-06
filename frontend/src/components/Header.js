import React from 'react'; // Import React to use JSX and component functionality
import logo from '../assets/logo.png'; // Import the logo image from specified filepath
import './Header.css'; // Import the CSS file for styling

// Header component to display the application header with a logo
const Header = () => {
  return (
    <header className="header"> {/* Header container with a class for styling */}
      <img src={logo} alt="HyperCast Logo" className="header-logo" /> {/* Logo image with alt text and class for styling */}
    </header>
  );
};

export default Header; // Export the Header component for use in other parts of the application
