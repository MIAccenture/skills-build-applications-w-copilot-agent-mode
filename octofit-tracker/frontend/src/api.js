const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const API_HOST = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
export const API_BASE_URL = `${API_HOST}/api`;
export const CODESPACE_NAME = codespaceName || '';

export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;

  return [];
}

export function getApiUrl(path) {
  const rawPath = String(path || '').trim();
  if (!rawPath) {
    throw new Error('API path must not be empty');
  }

  if (rawPath.startsWith('http://') || rawPath.startsWith('https://')) {
    return rawPath;
  }

  const trimmedPath = rawPath.replace(/^\/+|\/+$/g, '');
  if (!trimmedPath) {
    throw new Error('API path must not be empty');
  }

  return `${API_BASE_URL}/${trimmedPath}/`;
}

export async function fetchApiList(path) {
  const url = getApiUrl(path);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const json = await response.json();
  return normalizeApiResponse(json);
}
