import { useEffect, useState } from 'react';

const THEME_KEY = 'cn_theme';

// PUBLIC_INTERFACE
export default function useTheme(defaultTheme = 'light') {
  /** Persist theme in localStorage and update document data-theme attribute. */
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return { theme, setTheme, toggleTheme };
}
