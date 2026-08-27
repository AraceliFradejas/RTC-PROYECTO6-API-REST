const API_URL = `${window.location.origin}/api`;

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
  const payload = await response.json();
  if (payload.success === false) throw new Error(payload.message || 'La API devolvió un error');
  return Array.isArray(payload.data) ? payload.data : payload.data ?? payload;
}

export const api = {
  getAlbums: () => request('/albums'),
  getAlbum: (id) => request(`/albums/${encodeURIComponent(id)}`),
  getSongs: (filters = {}) => {
    const params = new URLSearchParams(
      Object.entries(filters).filter(([, value]) => value !== undefined && value !== '')
    );
    return request(`/songs${params.size ? `?${params}` : ''}`);
  }
};
