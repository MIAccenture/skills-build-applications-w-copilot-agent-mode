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

export async function fetchApiList(path) {
  const response = await fetch(`${API_BASE_URL}/${path}/`);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const json = await response.json();
  return normalizeApiResponse(json);
}
