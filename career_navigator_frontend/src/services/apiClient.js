import { getApiBase } from '../utils/env';

const base = getApiBase();

async function request(path, options = {}) {
  const url = (base.endsWith('/') ? base.slice(0, -1) : base) + (String(path).startsWith('/') ? path : `/${path}`);
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

export default { get, post };
