import { createElement } from '../utils/dom.js';
import { createSongActions } from './song-actions.js';

export function createSearchResult(song, index, { translate, onAlbumSelect }) {
  const metadata = createElement('p', { className: 'search-result-card__meta' }, [
    document.createTextNode(song.author || 'Taylor Swift')
  ]);
  if (song.album) {
    metadata.append(' · ', createElement('strong', { text: song.album.title }), ` (${song.album.year || ''})`);
  }

  const card = createElement('article', {
    className: 'search-result-card',
    attrs: {
      tabindex: song.album?._id ? '0' : '-1',
      'aria-label': `Canción ${song.title}${song.album ? ` del álbum ${song.album.title}` : ''}`
    }
  }, [
    createElement('span', { className: 'search-result-card__number', text: index + 1 }),
    createElement('div', { className: 'search-result-card__info' }, [
      createElement('p', { className: 'search-result-card__title', text: song.title }), metadata
    ]),
    song.isPopular ? createElement('span', { className: 'search-result-card__popular', text: translate('song.popular') }) : null,
    createSongActions(song, translate),
    createElement('span', { className: 'search-result-card__duration', text: song.duration || '' })
  ]);

  if (song.album?._id) {
    card.setAttribute('role', 'button');
    card.addEventListener('click', (event) => { if (!event.target.closest('a')) onAlbumSelect(song.album._id); });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onAlbumSelect(song.album._id);
      }
    });
  }
  return card;
}
