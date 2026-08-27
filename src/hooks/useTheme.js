import { useCallback, useEffect, useState } from "react";

export const THEME_KEY = "portfolio-theme";
const DEFAULT_THEME = "dark";

function readStoredTheme() {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
  } catch {
    // Private mode / blocked storage — fall back to the default.
    return DEFAULT_THEME;
  }
}

function applyTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * Persisted light/dark theme, mirrored onto <html data-theme>.
 * index.html applies the stored value before paint to avoid a flash.
 */
export function useTheme() {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Persisting is best-effort only.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggleTheme, isDark: theme === "dark" };
}
