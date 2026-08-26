/* ═══════════════════════════════════════════════════════
   Taylor Swift Discography — Frontend App
   ═══════════════════════════════════════════════════════ */

const API_URL = window.location.origin + '/api';
const translations = {
  es: {
    'nav.eras': 'Eras',
    'nav.search': 'Buscar',
    'nav.about': 'Sobre',
    'hero.subtitle': 'Explora la discografía completa de',
    'hero.tagline': '16 álbumes • 90+ canciones • una discografía que sigue creciendo',
    'hero.cta': 'Descubre las Eras ✨',
    'hero.scroll': 'scroll',
    'search.title': 'Buscar',
    'search.titleAccent': 'canciones',
    'search.label': 'Buscar canciones por título, autor o año',
    'search.help': 'Prueba con "Love Story", "Jack Antonoff" o "2020"',
    'eras.title': 'Las',
    'eras.titleAccent': 'Eras',
    'eras.subtitle': 'Haz clic en un álbum para explorar sus canciones',
    'modal.songs': '🎶 Canciones',
    'about.title': 'Sobre este',
    'about.titleAccent': 'proyecto',
    'about.tech': '🛠️ Tech Stack',
    'about.backend': 'Backend:',
    'about.db': 'Base de datos:',
    'about.frontend': 'Frontend:',
    'about.deploy': 'Deploy:',
    'about.api': '📋 API Endpoints',
    'about.allAlbums': 'Todos los álbumes',
    'about.allSongs': 'Todas las canciones',
    'about.search': 'Buscar',
    'about.crud': 'CRUD completo',
    'about.author': '👩‍💻 Autora',
    'about.authorText': 'Esta página es un ejercicio realizado por Araceli Fradejas Muñoz como entrega para el Proyecto 6: API REST, del módulo 5 Backend Node + Mongo del máster Rock The Code de The Power. Es una app interactiva desarrollada con Node.js, Express, MongoDB Atlas, Mongoose y frontend en HTML, CSS y Vanilla JavaScript. No es una aplicación oficial de Taylor Swift.',
    'about.github': 'Ver en GitHub',
    'about.follow': 'Sígueme en / Follow me on:',
    'footer.text': '© 2026 Taylor Swift Discography API — Proyecto 6 del Máster. Este proyecto es una práctica educativa y personal inspirada en la discografía de Taylor Swift. Como Swiftie, me ha encantado hacer esta entrega de mi máster. No está afiliado ni oficializado por Taylor Swift ni por su discografía oficial.',
    'song.popular': '★ Popular',
    'song.noResults': 'No se encontraron resultados 🎵',
    'song.loading': 'Cargando...',
    'song.openSpotify': 'Spotify',
    'song.openApple': 'Apple Music',
    'song.label': 'Sello:',
    'search.empty': 'No se encontraron resultados 🎵',
    'album.none': 'No se encontraron álbumes. Ejecuta npm run seed para cargar datos.',
    'album.error': '⚠️ Error conectando con la API. Asegúrate de que el servidor está corriendo.',
    'song.error': '⚠️ Error al buscar. Asegúrate de que el servidor está corriendo.',
    'songs.empty': 'Sin canciones cargadas',
    'album.meta': 'canciones',
    'search.didYouMean': '¿Quisiste decir',
    'search.resultsFor': 'Resultados para',
    'search.bySong': 'canción',
    'search.byAlbum': 'álbum',
    'search.byAuthor': 'autor',
    'search.funCloseOptions': 'Casi era esta era... ✨|Close enough para la Eras Tour 💫|Eso estuvo muy folklore, casi casi 🌲|Este puente casi nos lleva al tema correcto 🎶',
    'search.funOopsOptions': 'Swiftie detector activado: creo que querías decir|Lo canto bajito: probablemente buscabas|Este easter egg apunta a|No está mal escrito... está en versión Taylor\'s, quizá era'
  },
  en: {
    'nav.eras': 'Eras',
    'nav.search': 'Search',
    'nav.about': 'About',
    'hero.subtitle': 'Explore the complete discography of',
    'hero.tagline': '16 albums • 90+ songs • a discography that keeps growing',
    'hero.cta': 'Discover the Eras ✨',
    'hero.scroll': 'scroll',
    'search.title': 'Search',
    'search.titleAccent': 'songs',
    'search.label': 'Search songs by title, artist, or year',
    'search.help': 'Try "Love Story", "Jack Antonoff" or "2020"',
    'eras.title': 'The',
    'eras.titleAccent': 'Eras',
    'eras.subtitle': 'Click an album to explore its songs',
    'modal.songs': '🎶 Songs',
    'about.title': 'About this',
    'about.titleAccent': 'project',
    'about.tech': '🛠️ Tech Stack',
    'about.backend': 'Backend:',
    'about.db': 'Database:',
    'about.frontend': 'Frontend:',
    'about.deploy': 'Deploy:',
    'about.api': '📋 API Endpoints',
    'about.allAlbums': 'All albums',
    'about.allSongs': 'All songs',
    'about.search': 'Search',
    'about.crud': 'Complete CRUD',
    'about.author': '👩‍💻 Author',
    'about.authorText': 'This page is an exercise made by Araceli Fradejas Muñoz as the delivery for Project 6: REST API, from module 5 Backend Node + Mongo in the Rock The Code master by The Power. It is an interactive app built with Node.js, Express, MongoDB Atlas, Mongoose, and a frontend in HTML, CSS, and Vanilla JavaScript. It is not an official Taylor Swift application.',
    'about.github': 'View on GitHub',
    'about.follow': 'Follow me on:',
    'footer.text': '© 2026 Taylor Swift Discography API — Master Project 6. This is an educational and personal project inspired by Taylor Swift’s discography. As a Swiftie, I loved creating this final deliverable for my master’s. It is not affiliated with or endorsed by Taylor Swift or her official discography.',
    'song.popular': '★ Popular',
    'song.noResults': 'No results found 🎵',
    'song.loading': 'Loading...',
    'song.openSpotify': 'Spotify',
    'song.openApple': 'Apple Music',
    'song.label': 'Label:',
    'search.empty': 'No results found 🎵',
    'album.none': 'No albums found. Run npm run seed to load data.',
    'album.error': '⚠️ Could not connect to the API. Make sure the server is running.',
    'song.error': '⚠️ Search failed. Make sure the server is running.',
    'songs.empty': 'No songs loaded',
    'album.meta': 'songs',
    'search.didYouMean': 'Did you mean',
    'search.resultsFor': 'Results for',
    'search.bySong': 'song',
    'search.byAlbum': 'album',
    'search.byAuthor': 'author',
    'search.funCloseOptions': 'Very close to the right era... ✨|That was almost a perfect bridge 💫|You are one typo away from the right track 🎶|Swiftie radar says: almost there 🌟',
    'search.funOopsOptions': 'Swiftie radar says you probably meant|Tiny typo, big reputation: maybe it is|Easter egg mode on: try|I can read your mind... maybe you meant'
  }
};

let currentLanguage = localStorage.getItem('tsLang') || 'es';

// ── DOM Elements ────────────────────────────────────────
const albumsGrid = document.getElementById('albums-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const modal = document.getElementById('album-modal');
const modalOverlay = modal.querySelector('.modal__overlay');
const modalClose = modal.querySelector('.modal__close');
const modalCover = document.getElementById('modal-cover');
const modalTitle = document.getElementById('modal-title');
const modalEra = document.getElementById('modal-era');
const modalYear = document.getElementById('modal-year');
const modalDesc = document.getElementById('modal-desc');
const modalLabel = document.getElementById('modal-label');
const modalSongsList = document.getElementById('modal-songs-list');
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const langToggle = document.getElementById('lang-toggle');
const heroCarouselTrack = document.getElementById('hero-carousel-track');

function createNode(tag, { className = '', text = '', attrs = {}, styles = {} } = {}, children = []) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== '') node.textContent = text;
  Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, String(value)));
  Object.assign(node.style, styles);
  children.filter(Boolean).forEach((child) => node.append(child));
  return node;
}

function createLoader(fullWidth = false) {
  const loader = createNode('div', { className: 'loader' }, [createNode('div', { className: 'loader__spinner' })]);
  if (fullWidth) loader.style.gridColumn = '1 / -1';
  return loader;
}

function createMessage(text, className = '') {
  return createNode('p', { className, text });
}

// ── State ────────────────────────────────────────────────
let albumsCache = [];
let searchTimeout = null;
const coverCache = new Map();
let songsIndexCache = [];

// ═══ INIT ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  applyLanguage();
  loadAlbums();
  setupEventListeners();
});

function applyLanguage() {
  const textMap = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    if (textMap[key]) {
      node.textContent = textMap[key];
    }
  });

  if (langToggle) {
    langToggle.textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    langToggle.setAttribute('aria-label', currentLanguage === 'es' ? 'Switch to English' : 'Cambiar a español');
  }

  const searchPlaceholder = currentLanguage === 'es' ? 'Busca por título, autor o año...' : 'Search by title, artist or year...';
  if (searchInput) searchInput.placeholder = searchPlaceholder;
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
  localStorage.setItem('tsLang', currentLanguage);
  applyLanguage();
}

// ═══ EVENT LISTENERS ════════════════════════════════════
function setupEventListeners() {
  // Search
  searchInput.addEventListener('input', debounceSearch);
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performSearch();
  });

  // Modal
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Mobile nav
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  langToggle.addEventListener('click', toggleLanguage);

  searchResults.addEventListener('click', (event) => {
    const suggestionButton = event.target.closest('[data-suggestion-query]');
    if (!suggestionButton) return;

    const suggestedQuery = suggestionButton.getAttribute('data-suggestion-query');
    if (!suggestedQuery) return;

    searchInput.value = suggestedQuery;
    performSearch();
  });
}

function getLabel(key) {
  return translations[currentLanguage][key] || key;
}

function getRandomMessage(key) {
  const value = getLabel(key);
  if (!value || typeof value !== 'string') return '';
  const options = value.split('|').map((part) => part.trim()).filter(Boolean);
  if (options.length === 0) return '';
  return options[Math.floor(Math.random() * options.length)];
}

function getSongLinks(song) {
  const spotifyUrl = song.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(`${song.title} Taylor Swift ${song.album ? song.album.title : ''}`)}`;
  const appleUrl = song.appleMusicUrl || `https://music.apple.com/us/search?term=${encodeURIComponent(`${song.title} Taylor Swift ${song.album ? song.album.title : ''}`)}`;
  return { spotifyUrl, appleUrl };
}

function normalizeText(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeForSearch(text = '') {
  return normalizeText(text).replace(/\s+/g, '');
}

function levenshteinDistance(a = '', b = '') {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) dp[i][0] = i;
  for (let j = 0; j < cols; j += 1) dp[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

async function getSongsIndex() {
  if (songsIndexCache.length > 0) return songsIndexCache;

  const res = await fetch(`${API_URL}/songs`);
  const json = await res.json();
  songsIndexCache = Array.isArray(json.data) ? json.data : [];
  return songsIndexCache;
}

function getSearchHelp(query, songs) {
  const q = normalizeForSearch(query);
  if (!q || q.length < 2 || !Array.isArray(songs) || songs.length === 0) {
    return { matches: [], suggestion: null, suggestionType: null, playful: null };
  }

  const titleMatches = songs.filter((song) => {
    const title = normalizeForSearch(song.title || '');
    return title.includes(q) || q.includes(title);
  });

  const albumMatches = songs.filter((song) => {
    const albumTitle = normalizeForSearch(song.album?.title || '');
    return albumTitle.includes(q) || q.includes(albumTitle);
  });

  const authorMatches = songs.filter((song) => {
    const author = normalizeForSearch(song.author || '');
    return author.includes(q) || q.includes(author);
  });

  const dedupeSongs = (list) => {
    const seen = new Set();
    return list.filter((song) => {
      if (!song?._id || seen.has(song._id)) return false;
      seen.add(song._id);
      return true;
    });
  };

  const buildCloseHelp = (matches, type, canonicalValue) => {
    const isSame = normalizeForSearch(canonicalValue) === q;
    return {
      matches: dedupeSongs(matches).slice(0, 25),
      suggestion: isSame ? null : canonicalValue,
      suggestionType: isSame ? null : type,
      playful: isSame ? null : getRandomMessage('search.funCloseOptions')
    };
  };

  if (titleMatches.length > 0) {
    return buildCloseHelp(titleMatches, 'song', titleMatches[0].title || '');
  }

  if (albumMatches.length > 0) {
    return buildCloseHelp(albumMatches, 'album', albumMatches[0].album?.title || '');
  }

  if (authorMatches.length > 0) {
    return buildCloseHelp(authorMatches, 'author', authorMatches[0].author || '');
  }

  const uniqueTerms = {
    song: [...new Set(songs.map((song) => song.title).filter(Boolean))],
    album: [...new Set(songs.map((song) => song.album?.title).filter(Boolean))],
    author: [...new Set(songs.map((song) => song.author).filter(Boolean))]
  };

  const findBestCandidate = (terms, type) => {
    let best = null;
    for (const term of terms) {
      const normalized = normalizeForSearch(term);
      if (!normalized) continue;

      const distance = levenshteinDistance(q, normalized);
      const ratio = distance / Math.max(normalized.length, q.length, 1);

      if (!best || ratio < best.ratio) {
        best = { type, term, ratio };
      }
    }
    return best;
  };

  const candidates = [
    findBestCandidate(uniqueTerms.song, 'song'),
    findBestCandidate(uniqueTerms.album, 'album'),
    findBestCandidate(uniqueTerms.author, 'author')
  ].filter(Boolean);

  const bestCandidate = candidates.sort((a, b) => a.ratio - b.ratio)[0];

  if (!bestCandidate || bestCandidate.ratio > 0.34) {
    return { matches: [], suggestion: null, suggestionType: null, playful: null };
  }

  const matchesByType =
    bestCandidate.type === 'song'
      ? songs.filter((song) => song.title === bestCandidate.term)
      : bestCandidate.type === 'album'
        ? songs.filter((song) => song.album?.title === bestCandidate.term)
        : songs.filter((song) => song.author === bestCandidate.term);

  return {
    matches: dedupeSongs(matchesByType).slice(0, 25),
    suggestion: bestCandidate.term,
    suggestionType: bestCandidate.type,
    playful: getRandomMessage('search.funOopsOptions')
  };
}

function looksGeneratedCover(url = '') {
  return typeof url === 'string' && url.startsWith('data:image/svg+xml');
}

const FALLBACK_COVER = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><rect fill=%22%2316161f%22 width=%22400%22 height=%22400%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236b6a76%22 font-size=%2260%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22>🎵</text></svg>';

function isUsableCoverUrl(url = '') {
  if (typeof url !== 'string') return false;
  return /^https?:\/\//i.test(url) || url.startsWith('data:image/');
}

async function resolveRealAlbumCover(album) {
  if (!album || !album.title) return '';

  if (coverCache.has(album.title)) {
    return coverCache.get(album.title);
  }

  if (isUsableCoverUrl(album.coverImage) && !looksGeneratedCover(album.coverImage)) {
    coverCache.set(album.title, album.coverImage);
    return album.coverImage;
  }

  try {
    const query = encodeURIComponent(`Taylor Swift ${album.title}`);
    const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=album&limit=10`);
    const json = await res.json();
    const results = Array.isArray(json.results) ? json.results : [];

    const wanted = normalizeText(album.title);
    const best =
      results.find((item) => normalizeText(item.collectionName || '') === wanted) ||
      results.find((item) => normalizeText(item.collectionName || '').includes(wanted)) ||
      results[0];

    if (best && best.artworkUrl100) {
      const hiRes = best.artworkUrl100.replace('100x100bb', '1200x1200bb');
      coverCache.set(album.title, hiRes);
      return hiRes;
    }
  } catch (error) {
    console.warn('No se pudo resolver portada real para', album.title, error);
  }

  const fallback = isUsableCoverUrl(album.coverImage) ? album.coverImage : FALLBACK_COVER;
  coverCache.set(album.title, fallback);
  return fallback;
}

async function hydrateAlbumCovers(albums) {
  const tasks = albums.map(async (album) => {
    const img = document.querySelector(`.album-card__cover[data-album-id="${album._id}"]`);
    if (!img) return;

    const resolved = await resolveRealAlbumCover(album);
    if (resolved) {
      img.src = resolved;
    }
  });

  await Promise.allSettled(tasks);
}

async function renderHeroCarousel(albums) {
  if (!heroCarouselTrack || !Array.isArray(albums) || albums.length === 0) return;

  const orderedAlbums = [...albums].sort((a, b) => (a.year || 0) - (b.year || 0));
  const withCovers = await Promise.all(
    orderedAlbums.map(async (album) => {
      const cover = await resolveRealAlbumCover(album);
      return {
        ...album,
        resolvedCover: cover || album.coverImage || ''
      };
    })
  );

  const fragment = document.createDocumentFragment();
  [...withCovers, ...withCovers].forEach((album) => {
    const image = createNode('img', {
      attrs: { src: album.resolvedCover, alt: `Portada ${album.title}`, loading: 'lazy' }
    });
    image.addEventListener('error', () => { image.src = FALLBACK_COVER; }, { once: true });
    fragment.append(createNode('figure', { className: 'hero__carousel-item' }, [image]));
  });
  heroCarouselTrack.replaceChildren(fragment);
}

// ═══ ALBUMS ═════════════════════════════════════════════
async function loadAlbums() {
  albumsGrid.replaceChildren(createLoader(true));

  try {
    const res = await fetch(`${API_URL}/albums`);
    const json = await res.json();

    if (json.success && json.data.length > 0) {
      albumsCache = json.data;
      renderAlbums(json.data);
      renderHeroCarousel(json.data);
    } else {
      const message = createMessage(getLabel('album.none'));
      Object.assign(message.style, { gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' });
      albumsGrid.replaceChildren(message);
    }
  } catch (err) {
    console.error('Error cargando álbumes:', err);
    const message = createMessage(getLabel('album.error'));
    Object.assign(message.style, { gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' });
    albumsGrid.replaceChildren(message);
  }
}

function renderAlbums(albums) {
  const cards = albums.map((album, index) => {
    const isShowgirl = normalizeText(album.title || '') === normalizeText('The Life of a Showgirl');
    const image = createNode('img', {
      className: 'album-card__cover',
      attrs: {
        'data-album-id': album._id,
        src: isUsableCoverUrl(album.coverImage) ? album.coverImage : FALLBACK_COVER,
        alt: `Portada del álbum ${album.title}`,
        loading: index < 4 ? 'eager' : 'lazy'
      }
    });
    image.addEventListener('error', () => { image.src = FALLBACK_COVER; }, { once: true });

    const overlay = createNode('div', { className: 'album-card__overlay', attrs: { 'aria-hidden': 'true' } }, [
      createNode('div', { className: 'album-card__play', text: '▶' })
    ]);
    const cover = createNode('div', { className: 'album-card__cover-wrapper' }, [image, overlay]);
    const era = createNode('span', { className: 'album-card__era', text: album.era || '' });
    era.style.color = album.eraColor || '#d4a0c8';
    const meta = createNode('div', { className: 'album-card__meta' }, [
      createNode('span', { text: album.year }),
      createNode('span', { text: `${album.songs ? album.songs.length : 0} ${getLabel('album.meta')}` })
    ]);
    const body = createNode('div', { className: 'album-card__body' }, [
      era,
      createNode('h3', { className: 'album-card__title', text: album.title }),
      meta
    ]);
    const card = createNode('article', {
      className: `album-card${isShowgirl ? ' album-card--showgirl' : ''}`,
      attrs: { role: 'listitem', tabindex: '0', 'data-id': album._id, 'aria-label': `Álbum ${album.title}, ${album.year}` }
    }, [cover, body]);
    card.style.setProperty('--era-color', album.eraColor || '#d4a0c8');
    card.addEventListener('click', () => openAlbum(album._id));
    card.addEventListener('keydown', (event) => { if (event.key === 'Enter') openAlbum(album._id); });
    return card;
  });

  albumsGrid.replaceChildren(...cards);

  hydrateAlbumCovers(albums);
}

// ═══ ALBUM DETAIL ═══════════════════════════════════════
async function openAlbum(id) {
  try {
    const res = await fetch(`${API_URL}/albums/${id}`);
    const json = await res.json();

    if (!json.success) return;

    const album = json.data;

    modalCover.src = isUsableCoverUrl(album.coverImage) ? album.coverImage : FALLBACK_COVER;
    modalCover.onerror = () => {
      modalCover.onerror = null;
      modalCover.src = FALLBACK_COVER;
    };
    const realCover = await resolveRealAlbumCover(album);
    if (realCover) {
      modalCover.src = realCover;
    }
    modalCover.alt = `Portada de ${album.title}`;
    modalTitle.textContent = album.title;
    modalEra.textContent = album.era || '';
    modalEra.style.color = album.eraColor || '#d4a0c8';
    modalYear.textContent = album.year;
    modalDesc.textContent = album.description || '';
    modalLabel.textContent = album.label ? `${getLabel('song.label')} ${album.label}` : '';

    if (album.songs && album.songs.length > 0) {
      const songItems = album.songs.map((song, index) => {
        const links = getSongLinks(song);
        const info = createNode('div', { className: 'modal__song-info' }, [
          createNode('p', { className: 'modal__song-title', text: song.title }),
          createNode('p', { className: 'modal__song-author', text: song.author || 'Taylor Swift' })
        ]);
        const actions = createNode('div', { className: 'modal__song-actions' }, [
          createNode('a', { className: 'modal__song-link', text: getLabel('song.openSpotify'), attrs: { href: links.spotifyUrl, target: '_blank', rel: 'noopener noreferrer' } }),
          createNode('a', { className: 'modal__song-link apple', text: getLabel('song.openApple'), attrs: { href: links.appleUrl, target: '_blank', rel: 'noopener noreferrer' } })
        ]);
        return createNode('li', { className: 'modal__song', attrs: { role: 'listitem' } }, [
          createNode('span', { className: 'modal__song-number', text: song.trackNumber || index + 1 }),
          info,
          song.isPopular ? createNode('span', { className: 'modal__song-badge', text: getLabel('song.popular') }) : null,
          actions,
          createNode('span', { className: 'modal__song-duration', text: song.duration || '' })
        ]);
      });
      modalSongsList.replaceChildren(...songItems);
    } else {
      const empty = createNode('li', { className: 'modal__song', text: getLabel('songs.empty') });
      Object.assign(empty.style, { color: 'var(--text-muted)', justifyContent: 'center' });
      modalSongsList.replaceChildren(empty);
    }

    // Color accent from era
    modal.style.setProperty('--era-accent', album.eraColor || '#d4a0c8');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Focus trap
    modalClose.focus();
  } catch (err) {
    console.error('Error cargando álbum:', err);
  }
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

// ═══ SEARCH ═════════════════════════════════════════════
function debounceSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(performSearch, 400);
}

async function performSearch() {
  const query = searchInput.value.trim();

  if (!query) {
    searchResults.replaceChildren();
    return;
  }

  searchResults.replaceChildren(createLoader());

  try {
    // Search by title first, then by author
    const [titleRes, authorRes] = await Promise.all([
      fetch(`${API_URL}/songs?title=${encodeURIComponent(query)}`),
      fetch(`${API_URL}/songs?author=${encodeURIComponent(query)}`)
    ]);

    const titleJson = await titleRes.json();
    const authorJson = await authorRes.json();

    // Merge results, deduplicate by _id
    const seen = new Set();
    const allSongs = [];

    [...(titleJson.data || []), ...(authorJson.data || [])].forEach((song) => {
      if (!seen.has(song._id)) {
        seen.add(song._id);
        allSongs.push(song);
      }
    });

    // Also try year search
    if (/^\d{4}$/.test(query)) {
      const yearRes = await fetch(`${API_URL}/songs?year=${query}`);
      const yearJson = await yearRes.json();
      (yearJson.data || []).forEach((song) => {
        if (!seen.has(song._id)) {
          seen.add(song._id);
          allSongs.push(song);
        }
      });
    }

    if (allSongs.length > 0) {
      renderSearchResults(allSongs, null, query);
      return;
    }

    const songsIndex = await getSongsIndex();
    const help = getSearchHelp(query, songsIndex);
    renderSearchResults(help.matches, help, query);
  } catch (err) {
    console.error('Error buscando:', err);
    searchResults.replaceChildren(createMessage(getLabel('song.error'), 'search__no-results'));
  }
}

function renderSearchResults(songs, help = null, originalQuery = '') {
  const suggestion = help?.suggestion;
  const suggestionType = help?.suggestionType;
  const playful = help?.playful;

  const typeLabel =
    suggestionType === 'song'
      ? getLabel('search.bySong')
      : suggestionType === 'album'
        ? getLabel('search.byAlbum')
        : suggestionType === 'author'
          ? getLabel('search.byAuthor')
          : '';

  const headingNodes = [];
  if (originalQuery) {
    headingNodes.push(createMessage(`${getLabel('search.resultsFor')} "${originalQuery}"`, 'search__results-heading'));
  }

  if (suggestion) {
    if (playful) headingNodes.push(createMessage(playful, 'search__suggestion-note'));
    const suggestionButton = createNode('button', {
      className: 'search__suggestion-btn',
      text: suggestion,
      attrs: { type: 'button', 'data-suggestion-query': suggestion }
    });
    const suggestionBox = createNode('div', { className: 'search__suggestion' }, [
      document.createTextNode(`${getLabel('search.didYouMean')} `),
      suggestionButton,
      document.createTextNode(`${typeLabel ? ` (${typeLabel})` : ''}?`)
    ]);
    headingNodes.push(suggestionBox);
  }

  if (songs.length === 0) {
    searchResults.replaceChildren(...headingNodes, createMessage(getLabel('search.empty'), 'search__no-results'));
    return;
  }

  const cards = songs.map((song, index) => {
    const links = getSongLinks(song);
    const metadata = createNode('p', { className: 'search-result-card__meta' }, [
      document.createTextNode(song.author || 'Taylor Swift')
    ]);
    if (song.album) {
      metadata.append(document.createTextNode(' · '));
      metadata.append(createNode('strong', { text: song.album.title }));
      metadata.append(document.createTextNode(` (${song.album.year || ''})`));
    }
    const info = createNode('div', { className: 'search-result-card__info' }, [
      createNode('p', { className: 'search-result-card__title', text: song.title }),
      metadata
    ]);
    const actions = createNode('div', { className: 'search-result-card__actions' }, [
      createNode('a', { className: 'search-result-card__link', text: getLabel('song.openSpotify'), attrs: { href: links.spotifyUrl, target: '_blank', rel: 'noopener noreferrer' } }),
      createNode('a', { className: 'search-result-card__link apple', text: getLabel('song.openApple'), attrs: { href: links.appleUrl, target: '_blank', rel: 'noopener noreferrer' } })
    ]);
    const card = createNode('div', {
      className: 'search-result-card',
      attrs: {
        tabindex: '0',
        role: 'button',
        'aria-label': `Canción ${song.title} del álbum ${song.album ? song.album.title : 'desconocido'}`
      }
    }, [
      createNode('span', { className: 'search-result-card__number', text: index + 1 }),
      info,
      song.isPopular ? createNode('span', { className: 'search-result-card__popular', text: getLabel('song.popular') }) : null,
      actions,
      createNode('span', { className: 'search-result-card__duration', text: song.duration || '' })
    ]);
    if (song.album?._id) {
      card.addEventListener('click', (event) => { if (!event.target.closest('a')) openAlbum(song.album._id); });
      card.addEventListener('keydown', (event) => { if (event.key === 'Enter') openAlbum(song.album._id); });
    }
    return card;
  });

  searchResults.replaceChildren(...headingNodes, ...cards);
}

// Make openAlbum globally accessible
window.openAlbum = openAlbum;
