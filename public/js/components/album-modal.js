import { getRequiredElement, createElement } from '../utils/dom.js';
import { api } from '../services/api.js';
import { FALLBACK_COVER, resolveAlbumCover, setImageFallback } from '../services/covers.js';
import { createSongListItem } from './song-list-item.js';

export function createAlbumModal(translate) {
  const modal = getRequiredElement('#album-modal');
  const closeButton = getRequiredElement('.modal__close', modal);
  const cover = getRequiredElement('#modal-cover');
  const songsList = getRequiredElement('#modal-songs-list');
  let trigger = null;

  function close() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    trigger?.focus();
  }

  async function open(id) {
    trigger = document.activeElement;
    try {
      const album = await api.getAlbum(id);
      cover.src = FALLBACK_COVER;
      cover.alt = `Portada de ${album.title}`;
      setImageFallback(cover);
      resolveAlbumCover(album).then((src) => { cover.src = src; });
      getRequiredElement('#modal-title').textContent = album.title;
      getRequiredElement('#modal-year').textContent = album.year;
      getRequiredElement('#modal-desc').textContent = album.description || '';
      getRequiredElement('#modal-label').textContent = album.label ? `${translate('song.label')} ${album.label}` : '';
      const era = getRequiredElement('#modal-era');
      era.textContent = album.era || '';
      era.style.color = album.eraColor || '#d4a0c8';

      const songs = album.songs?.length
        ? album.songs.map((song, index) => createSongListItem(song, index, translate))
        : [createElement('li', { className: 'modal__song modal__song--empty', text: translate('songs.empty') })];
      songsList.replaceChildren(...songs);
      modal.style.setProperty('--era-accent', album.eraColor || '#d4a0c8');
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    } catch (error) {
      console.error('Error cargando álbum:', error);
    }
  }

  closeButton.addEventListener('click', close);
  getRequiredElement('.modal__overlay', modal).addEventListener('click', close);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  return { open };
}
