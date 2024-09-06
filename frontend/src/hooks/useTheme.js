import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light'); // Default theme 'light'

  useEffect(() => {
    const root = document.documentElement;
    root.className = theme;
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
