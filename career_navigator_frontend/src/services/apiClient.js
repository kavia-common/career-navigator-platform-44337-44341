import { getApiBase } from '../utils/env';

let base = getApiBase() || '';
if (!base || base === '/') base = ''; // stay resilient to missing env vars

async function request(path, options = {}) {
  const url = base + (String(path).startsWith('/') ? path : `/${path}`);
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const resp = await fetch(url, { ...options, headers });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    const err = new Error(`Request failed: ${resp.status}`);
    err.status = resp.status;
    err.body = text;
    throw err;
  }
  const ct = resp.headers.get('content-type') || '';
  if (ct.includes('application/json')) return resp.json();
  return resp.text();
}

// PUBLIC_INTERFACE
export async function get(path) {
  /** Perform GET request to backend API. */
  return request(path, { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function post(path, body) {
  /** Perform POST request to backend API. */
  return request(path, { method: 'POST', body: JSON.stringify(body) });
}

/**
 * API client stubs for new endpoints (MVP)
 * These can be imported directly as needed, or replaced with real implementations if backend is ready.
 */

// PUBLIC_INTERFACE
export async function getRoles() {
  /** Fetch list of roles from backend or return empty array on failure. */
  try {
    return await get('/roles');
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export async function getCompetencyModels() {
  /** Fetch list of competency models from backend, fallback to ["SFIA"]. */
  try {
    return await get('/competency-models');
  } catch {
    return ['SFIA'];
  }
}

// PUBLIC_INTERFACE
export async function getSkillsForRole(role) {
  /** Fetch skills for a given role. */
  try {
    return await get(`/skills?role=${encodeURIComponent(role)}`);
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export async function submitGapAnalysis(required, user) {
  /** Call /gap-analysis endpoint to receive skill gap analysis result. */
  try {
    return await post('/gap-analysis', { required, user });
  } catch {
    return { strengths: [], gaps: [] };
  }
}

// PUBLIC_INTERFACE
export async function getActionableRecommendations(gaps) {
  /** Fetch courses/projects/etc. for remediating user skill gaps. */
  try {
    return await get(`/recommendations?gaps=${encodeURIComponent((gaps || []).join(','))}`);
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export async function saveSkillProgress(progress) {
  /** Write skill progress to backend API. */
  try {
    return await post('/progress', progress);
  } catch {
    return { success: false };
  }
}

export default {
  get, post,
  getRoles, getCompetencyModels, getSkillsForRole, submitGapAnalysis, getActionableRecommendations, saveSkillProgress
};
