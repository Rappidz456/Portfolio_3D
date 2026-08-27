import { createContext, useContext, useMemo } from "react";

import { useTheme } from "../hooks/useTheme";

const ThemeContext = createContext({
  theme: "dark",
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  const value = useMemo(
    () => ({ theme, isDark, toggleTheme }),
    [theme, isDark, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/** Read the active theme — used by the WebGL scenes to pick their palette. */
export const useThemeContext = () => useContext(ThemeContext);
