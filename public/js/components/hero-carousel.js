import { createElement, getRequiredElement } from '../utils/dom.js';
import { resolveAlbumCover, setImageFallback } from '../services/covers.js';

export async function renderHeroCarousel(albums) {
  const track = getRequiredElement('#hero-carousel-track');
  const ordered = [...albums].sort((a, b) => (a.year || 0) - (b.year || 0));
  const covers = await Promise.all(ordered.map(async (album) => ({ album, src: await resolveAlbumCover(album) })));
  const items = [...covers, ...covers].map(({ album, src }) => {
    const image = createElement('img', { attrs: { src, alt: `Portada ${album.title}`, loading: 'lazy' } });
    setImageFallback(image);
    return createElement('figure', { className: 'hero__carousel-item' }, [image]);
  });
  track.replaceChildren(...items);
}
