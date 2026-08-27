import { createElement } from '../utils/dom.js';
import { createSongActions } from './song-actions.js';

export function createSongListItem(song, index, translate) {
  return createElement('li', { className: 'modal__song' }, [
    createElement('span', { className: 'modal__song-number', text: song.trackNumber || index + 1 }),
    createElement('div', { className: 'modal__song-info' }, [
      createElement('p', { className: 'modal__song-title', text: song.title }),
      createElement('p', { className: 'modal__song-author', text: song.author || 'Taylor Swift' })
    ]),
    song.isPopular ? createElement('span', { className: 'modal__song-badge', text: translate('song.popular') }) : null,
    createSongActions(song, translate, 'modal'),
    createElement('span', { className: 'modal__song-duration', text: song.duration || '' })
  ]);
}
