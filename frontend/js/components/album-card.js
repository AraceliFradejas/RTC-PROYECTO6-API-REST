import { createElement } from '../utils/dom.js';
import { normalizeText } from '../utils/text.js';
import { FALLBACK_COVER, isUsableCover, resolveAlbumCover, setImageFallback } from '../services/covers.js';

export function createAlbumCard(album, index, { translate, onSelect }) {
  const isShowgirl = normalizeText(album.title) === normalizeText('The Life of a Showgirl');
  const image = createElement('img', {
    className: 'album-card__cover',
    attrs: {
      src: isUsableCover(album.coverImage) ? album.coverImage : FALLBACK_COVER,
      alt: `Portada del álbum ${album.title}`,
      loading: index < 4 ? 'eager' : 'lazy'
    }
  });
  setImageFallback(image);
  resolveAlbumCover(album).then((cover) => { image.src = cover; });

  const card = createElement('article', {
    className: `album-card${isShowgirl ? ' album-card--showgirl' : ''}`,
    attrs: { role: 'listitem', tabindex: '0', 'aria-label': `Álbum ${album.title}, ${album.year}` }
  }, [
    createElement('div', { className: 'album-card__cover-wrapper' }, [
      image,
      createElement('div', { className: 'album-card__overlay', attrs: { 'aria-hidden': 'true' } }, [
        createElement('div', { className: 'album-card__play', text: '▶' })
      ])
    ]),
    createElement('div', { className: 'album-card__body' }, [
      createElement('span', { className: 'album-card__era', text: album.era || '' }),
      createElement('h3', { className: 'album-card__title', text: album.title }),
      createElement('div', { className: 'album-card__meta' }, [
        createElement('span', { text: album.year }),
        createElement('span', { text: `${album.songs?.length || 0} ${translate('album.meta')}` })
      ])
    ])
  ]);
  card.style.setProperty('--era-color', album.eraColor || '#d4a0c8');
  card.querySelector('.album-card__era').style.color = album.eraColor || '#d4a0c8';
  card.addEventListener('click', () => onSelect(album._id));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(album._id);
    }
  });
  return card;
}
