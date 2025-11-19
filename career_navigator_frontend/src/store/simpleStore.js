import React, { createContext, useContext, useMemo } from 'react';
import useTheme from '../hooks/useTheme';
import { getFeatureFlags, isExperimentEnabled } from '../utils/env';

const AppContext = createContext(null);

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** Minimal provider exposing theme and feature flags via context. */
  const themeState = useTheme('light');
  const flags = useMemo(() => getFeatureFlags(), []);
  const experiments = useMemo(() => isExperimentEnabled(), []);
  const value = useMemo(() => ({ theme: themeState, flags, experiments, user: { name: 'Guest' } }), [themeState, flags, experiments]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// PUBLIC_INTERFACE
export function useApp() {
  /** Access application context: theme, flags, experiments, user. */
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within ThemeProvider');
  return ctx;
}
