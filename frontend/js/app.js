/* ═══════════════════════════════════════════════════════
   Taylor Swift Discography — Frontend App
   ═══════════════════════════════════════════════════════ */

const API_URL = window.location.origin + '/api';

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

// ── State ────────────────────────────────────────────────
let albumsCache = [];
let searchTimeout = null;

// ═══ INIT ═══════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  loadAlbums();
  setupEventListeners();
});

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
}

// ═══ ALBUMS ═════════════════════════════════════════════
async function loadAlbums() {
  albumsGrid.innerHTML = `
    <div class="loader" style="grid-column: 1 / -1;">
      <div class="loader__spinner"></div>
    </div>`;

  try {
    const res = await fetch(`${API_URL}/albums`);
    const json = await res.json();

    if (json.success && json.data.length > 0) {
      albumsCache = json.data;
      renderAlbums(json.data);
    } else {
      albumsGrid.innerHTML = `
        <p style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:3rem;">
          No se encontraron álbumes. Ejecuta <code>npm run seed</code> para cargar datos.
        </p>`;
    }
  } catch (err) {
    console.error('Error cargando álbumes:', err);
    albumsGrid.innerHTML = `
      <p style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:3rem;">
        ⚠️ Error conectando con la API. Asegúrate de que el servidor está corriendo.
      </p>`;
  }
}

function renderAlbums(albums) {
  albumsGrid.innerHTML = albums
    .map(
      (album, i) => `
    <article class="album-card" role="listitem" tabindex="0"
             data-id="${album._id}"
             style="--era-color: ${album.eraColor || '#d4a0c8'}"
             aria-label="Álbum ${album.title}, ${album.year}"
             onclick="openAlbum('${album._id}')"
             onkeydown="if(event.key==='Enter') openAlbum('${album._id}')">
      <div class="album-card__cover-wrapper">
        <img class="album-card__cover"
             src="${album.coverImage}"
             alt="Portada del álbum ${album.title}"
             loading="${i < 4 ? 'eager' : 'lazy'}"
             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><rect fill=%22%2316161f%22 width=%22400%22 height=%22400%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22%236b6a76%22 font-size=%2260%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22>🎵</text></svg>'" />
        <div class="album-card__overlay" aria-hidden="true">
          <div class="album-card__play">▶</div>
        </div>
      </div>
      <div class="album-card__body">
        <span class="album-card__era" style="color: ${album.eraColor || '#d4a0c8'}">${album.era || ''}</span>
        <h3 class="album-card__title">${album.title}</h3>
        <div class="album-card__meta">
          <span>${album.year}</span>
          <span>${album.songs ? album.songs.length : 0} canciones</span>
        </div>
      </div>
    </article>
  `
    )
    .join('');
}

// ═══ ALBUM DETAIL ═══════════════════════════════════════
async function openAlbum(id) {
  try {
    const res = await fetch(`${API_URL}/albums/${id}`);
    const json = await res.json();

    if (!json.success) return;

    const album = json.data;

    modalCover.src = album.coverImage;
    modalCover.alt = `Portada de ${album.title}`;
    modalTitle.textContent = album.title;
    modalEra.textContent = album.era || '';
    modalEra.style.color = album.eraColor || '#d4a0c8';
    modalYear.textContent = album.year;
    modalDesc.textContent = album.description || '';
    modalLabel.textContent = album.label ? `Sello: ${album.label}` : '';

    if (album.songs && album.songs.length > 0) {
      modalSongsList.innerHTML = album.songs
        .map(
          (song, i) => `
        <li class="modal__song" role="listitem">
          <span class="modal__song-number">${song.trackNumber || i + 1}</span>
          <div class="modal__song-info">
            <p class="modal__song-title">${song.title}</p>
            <p class="modal__song-author">${song.author || 'Taylor Swift'}</p>
          </div>
          ${song.isPopular ? '<span class="modal__song-badge">★ Popular</span>' : ''}
          <span class="modal__song-duration">${song.duration || ''}</span>
        </li>
      `
        )
        .join('');
    } else {
      modalSongsList.innerHTML = '<li class="modal__song" style="color:var(--text-muted); justify-content:center;">Sin canciones cargadas</li>';
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
    searchResults.innerHTML = '';
    return;
  }

  searchResults.innerHTML = `
    <div class="loader">
      <div class="loader__spinner"></div>
    </div>`;

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

    renderSearchResults(allSongs);
  } catch (err) {
    console.error('Error buscando:', err);
    searchResults.innerHTML = '<p class="search__no-results">⚠️ Error al buscar. Asegúrate de que el servidor está corriendo.</p>';
  }
}

function renderSearchResults(songs) {
  if (songs.length === 0) {
    searchResults.innerHTML = '<p class="search__no-results">No se encontraron resultados 🎵</p>';
    return;
  }

  searchResults.innerHTML = songs
    .map(
      (song, i) => `
    <div class="search-result-card" tabindex="0"
         ${song.album && song.album._id ? `onclick="openAlbum('${song.album._id}')" onkeydown="if(event.key==='Enter') openAlbum('${song.album._id}')"` : ''}
         role="button"
         aria-label="Canción ${song.title} del álbum ${song.album ? song.album.title : 'desconocido'}">
      <span class="search-result-card__number">${i + 1}</span>
      <div class="search-result-card__info">
        <p class="search-result-card__title">${song.title}</p>
        <p class="search-result-card__meta">
          ${song.author || 'Taylor Swift'}
          ${song.album ? ` · <strong>${song.album.title}</strong> (${song.album.year || ''})` : ''}
        </p>
      </div>
      ${song.isPopular ? '<span class="search-result-card__popular">★ Popular</span>' : ''}
      <span class="search-result-card__duration">${song.duration || ''}</span>
    </div>
  `
    )
    .join('');
}

// Make openAlbum globally accessible
window.openAlbum = openAlbum;
