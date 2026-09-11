/**
 * Single source of truth for the backend origin.
 *
 * 127.0.0.1 counts as local too — the Vite dev server is reachable on both,
 * and only matching "localhost" would silently point a local build at
 * production.
 */
const isLocal = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);

export const API_BASE: string =
  import.meta.env.VITE_API_URL ??
  (isLocal ? 'http://localhost:8000' : 'https://portfolio-backend-g68o.onrender.com');

/** The free Render instance cold-starts, which can take the best part of a minute. */
export const REQUEST_TIMEOUT_MS = 60_000;

/** Warn the visitor that a slow first request is a cold start, not a hang. */
export const COLD_START_HINT_MS = 7_000;

export class TimeoutError extends Error {}

export async function postJSON<T>(path: string, body: unknown, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    return { response, data: (await response.json().catch(() => null)) as T | null };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new TimeoutError('Request timed out');
    }
    throw error;
  } finally {
    window.clearTimeout(timer);
  }
}
