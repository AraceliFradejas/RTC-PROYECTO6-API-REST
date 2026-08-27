import { createElement } from '../utils/dom.js';

function getSongLinks(song) {
  const query = encodeURIComponent(`${song.title} Taylor Swift ${song.album?.title || ''}`);
  return {
    spotify: song.spotifyUrl || `https://open.spotify.com/search/${query}`,
    apple: song.appleMusicUrl || `https://music.apple.com/us/search?term=${query}`
  };
}

export function createSongActions(song, translate, variant = 'search-result-card') {
  const links = getSongLinks(song);
  const actionsClass = variant === 'modal' ? 'modal__song-actions' : `${variant}__actions`;
  const linkClass = variant === 'modal' ? 'modal__song-link' : `${variant}__link`;
  return createElement('div', { className: actionsClass }, [
    createElement('a', {
      className: linkClass, text: translate('song.openSpotify'),
      attrs: { href: links.spotify, target: '_blank', rel: 'noopener noreferrer' }
    }),
    createElement('a', {
      className: `${linkClass} apple`, text: translate('song.openApple'),
      attrs: { href: links.apple, target: '_blank', rel: 'noopener noreferrer' }
    })
  ]);
}
