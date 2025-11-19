const getEnv = (key, fallback = undefined) => {
  try {
    const val = process.env[key];
    return val === undefined || val === '' ? fallback : val;
  } catch {
    return fallback;
  }
};

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Resolve API base URL from REACT_APP_API_BASE or REACT_APP_BACKEND_URL; fallback to "/". */
  const base = getEnv('REACT_APP_API_BASE') ?? getEnv('REACT_APP_BACKEND_URL') ?? '/';
  return base || '/';
}

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  /** Parse REACT_APP_FEATURE_FLAGS as JSON or CSV into a Set of flags. */
  const raw = getEnv('REACT_APP_FEATURE_FLAGS', '');
  if (!raw) return new Set();
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed.map(String));
    if (parsed && typeof parsed === 'object') return new Set(Object.keys(parsed).filter(k => parsed[k]));
  } catch {
    // CSV fallback
    return new Set(String(raw).split(',').map(s => s.trim()).filter(Boolean));
  }
  return new Set();
}

// PUBLIC_INTERFACE
export function isExperimentEnabled() {
  /** Parse REACT_APP_EXPERIMENTS_ENABLED to boolean. */
  const raw = getEnv('REACT_APP_EXPERIMENTS_ENABLED', 'false');
  return ['1','true','yes','on'].includes(String(raw).toLowerCase());
}
