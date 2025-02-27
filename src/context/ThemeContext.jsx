import { createContext } from "react";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
  };
  return (
    <ThemeContext.Provider value={{ isDark, handleThemeToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
