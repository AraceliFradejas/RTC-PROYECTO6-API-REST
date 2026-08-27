import { api } from '../services/api.js';
import { createLoader, createMessage, getRequiredElement } from '../utils/dom.js';
import { createAlbumCard } from './album-card.js';
import { renderHeroCarousel } from './hero-carousel.js';

export async function loadAlbums({ translate, onAlbumSelect }) {
  const grid = getRequiredElement('#albums-grid');
  grid.replaceChildren(createLoader(true));
  try {
    const albums = await api.getAlbums();
    if (!albums.length) {
      grid.replaceChildren(createMessage(translate('album.none'), 'grid-message'));
      return;
    }
    grid.replaceChildren(...albums.map((album, index) =>
      createAlbumCard(album, index, { translate, onSelect: onAlbumSelect })
    ));
    renderHeroCarousel(albums).catch((error) => console.warn('No se pudo crear el carrusel:', error));
  } catch (error) {
    console.error('Error cargando álbumes:', error);
    grid.replaceChildren(createMessage(translate('album.error'), 'grid-message'));
  }
}
