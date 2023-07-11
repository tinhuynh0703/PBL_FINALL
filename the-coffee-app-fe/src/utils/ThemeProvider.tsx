import React, { useState } from 'react';

type Theme = 'Light' | 'Dark';
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const DarkMode = React.createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('Light');
  const toggleTheme = () => {
    setTheme(theme === 'Light' ? 'Dark' : 'Light');
  };

  const backgroundColor = theme === 'Light' ? '#f2f2f2' : '#333';

  document.body.style.backgroundColor = backgroundColor;

  return <DarkMode.Provider value={{ theme, toggleTheme }}>{children}</DarkMode.Provider>;
};
