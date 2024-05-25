import React from 'react';
import './ThemeToggleSwitch.css';

const ThemeToggleSwitch = ({ theme, toggleTheme }) => {
  return (
    <div className="theme-toggle-switch">
      <input
        type="checkbox"
        id="theme-switch"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-switch" className="theme-switch-label">
        <span className="theme-switch-ball"></span>
      </label>
      <span className="theme-switch-caption">
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </div>
  );
};

export default ThemeToggleSwitch;
