import { normalizeText } from '../utils/text.js';

export const FALLBACK_COVER = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><rect fill=%22%2316161f%22 width=%22400%22 height=%22400%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236b6a76%22 font-size=%2260%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22>🎵</text></svg>';
const cache = new Map();

export function isUsableCover(url = '') {
  return typeof url === 'string' && (/^https?:\/\//i.test(url) || url.startsWith('data:image/'));
}

export function setImageFallback(image) {
  image.addEventListener('error', () => { image.src = FALLBACK_COVER; }, { once: true });
}

export async function resolveAlbumCover(album) {
  if (!album?.title) return FALLBACK_COVER;
  if (cache.has(album.title)) return cache.get(album.title);
  if (isUsableCover(album.coverImage) && !album.coverImage.startsWith('data:image/svg+xml')) {
    cache.set(album.title, album.coverImage);
    return album.coverImage;
  }

  try {
    const term = encodeURIComponent(`Taylor Swift ${album.title}`);
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=album&limit=10`);
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    const { results = [] } = await response.json();
    const wanted = normalizeText(album.title);
    const match = results.find((item) => normalizeText(item.collectionName) === wanted)
      || results.find((item) => normalizeText(item.collectionName).includes(wanted))
      || results[0];
    if (match?.artworkUrl100) {
      const cover = match.artworkUrl100.replace('100x100bb', '1200x1200bb');
      cache.set(album.title, cover);
      return cover;
    }
  } catch (error) {
    console.warn(`No se pudo cargar la portada de ${album.title}:`, error);
  }

  const fallback = isUsableCover(album.coverImage) ? album.coverImage : FALLBACK_COVER;
  cache.set(album.title, fallback);
  return fallback;
}
