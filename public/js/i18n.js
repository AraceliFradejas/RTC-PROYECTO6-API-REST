const messages = {
  es: {
    'nav.eras': 'Eras', 'nav.search': 'Buscar', 'nav.about': 'Sobre',
    'hero.subtitle': 'Explora la discografía completa de', 'hero.tagline': '16 álbumes • 90+ canciones • una discografía que sigue creciendo', 'hero.cta': 'Descubre las Eras ✨', 'hero.scroll': 'scroll',
    'search.title': 'Buscar', 'search.titleAccent': 'canciones', 'search.label': 'Buscar canciones por título, autor o año', 'search.help': 'Prueba con "Love Story", "Jack Antonoff" o "2020"',
    'eras.title': 'Las', 'eras.titleAccent': 'Eras', 'eras.subtitle': 'Haz clic en un álbum para explorar sus canciones', 'modal.songs': '🎶 Canciones',
    'about.title': 'Sobre este', 'about.titleAccent': 'proyecto', 'about.tech': '🛠️ Tech Stack', 'about.backend': 'Backend:', 'about.db': 'Base de datos:', 'about.frontend': 'Frontend:', 'about.deploy': 'Deploy:',
    'about.api': '📋 API Endpoints', 'about.allAlbums': 'Todos los álbumes', 'about.allSongs': 'Todas las canciones', 'about.search': 'Buscar', 'about.crud': 'CRUD completo', 'about.author': '👩‍💻 Autora',
    'about.authorText': 'Esta página es un ejercicio realizado por Araceli Fradejas Muñoz como entrega para el Proyecto 6: API REST, del módulo 5 Backend Node + Mongo del máster Rock The Code de The Power. Es una app interactiva desarrollada con Node.js, Express, MongoDB Atlas, Mongoose y frontend en HTML, CSS y Vanilla JavaScript. No es una aplicación oficial de Taylor Swift.',
    'about.github': 'Ver en GitHub', 'about.follow': 'Sígueme en / Follow me on:',
    'footer.text': '© 2026 Taylor Swift Discography API — Proyecto 6 del Máster. Este proyecto es una práctica educativa y personal inspirada en la discografía de Taylor Swift. Como Swiftie, me ha encantado hacer esta entrega de mi máster. No está afiliado ni oficializado por Taylor Swift ni por su discografía oficial.',
    'song.popular': '★ Popular', 'song.openSpotify': 'Spotify', 'song.openApple': 'Apple Music', 'song.label': 'Sello:',
    'search.empty': 'No se encontraron resultados 🎵', 'album.none': 'No se encontraron álbumes. Ejecuta npm run seed para cargar datos.', 'album.error': '⚠️ Error conectando con la API. Asegúrate de que el servidor está corriendo.', 'song.error': '⚠️ Error al buscar. Asegúrate de que el servidor está corriendo.', 'songs.empty': 'Sin canciones cargadas', 'album.meta': 'canciones',
    'search.didYouMean': '¿Quisiste decir', 'search.resultsFor': 'Resultados para', 'search.bySong': 'canción', 'search.byAlbum': 'álbum', 'search.byAuthor': 'autor',
    'search.funCloseOptions': 'Casi era esta era... ✨|Close enough para la Eras Tour 💫|Eso estuvo muy folklore, casi casi 🌲|Este puente casi nos lleva al tema correcto 🎶',
    'search.funOopsOptions': 'Swiftie detector activado: creo que querías decir|Lo canto bajito: probablemente buscabas|Este easter egg apunta a|No está mal escrito... está en versión Taylor\'s, quizá era'
  },
  en: {
    'nav.eras': 'Eras', 'nav.search': 'Search', 'nav.about': 'About',
    'hero.subtitle': 'Explore the complete discography of', 'hero.tagline': '16 albums • 90+ songs • a discography that keeps growing', 'hero.cta': 'Discover the Eras ✨', 'hero.scroll': 'scroll',
    'search.title': 'Search', 'search.titleAccent': 'songs', 'search.label': 'Search songs by title, artist, or year', 'search.help': 'Try "Love Story", "Jack Antonoff" or "2020"',
    'eras.title': 'The', 'eras.titleAccent': 'Eras', 'eras.subtitle': 'Click an album to explore its songs', 'modal.songs': '🎶 Songs',
    'about.title': 'About this', 'about.titleAccent': 'project', 'about.tech': '🛠️ Tech Stack', 'about.backend': 'Backend:', 'about.db': 'Database:', 'about.frontend': 'Frontend:', 'about.deploy': 'Deploy:',
    'about.api': '📋 API Endpoints', 'about.allAlbums': 'All albums', 'about.allSongs': 'All songs', 'about.search': 'Search', 'about.crud': 'Complete CRUD', 'about.author': '👩‍💻 Author',
    'about.authorText': 'This page is an exercise made by Araceli Fradejas Muñoz as the delivery for Project 6: REST API, from module 5 Backend Node + Mongo in the Rock The Code master by The Power. It is an interactive app built with Node.js, Express, MongoDB Atlas, Mongoose, and a frontend in HTML, CSS, and Vanilla JavaScript. It is not an official Taylor Swift application.',
    'about.github': 'View on GitHub', 'about.follow': 'Follow me on:',
    'footer.text': '© 2026 Taylor Swift Discography API — Master Project 6. This is an educational and personal project inspired by Taylor Swift’s discography. As a Swiftie, I loved creating this final deliverable for my master’s. It is not affiliated with or endorsed by Taylor Swift or her official discography.',
    'song.popular': '★ Popular', 'song.openSpotify': 'Spotify', 'song.openApple': 'Apple Music', 'song.label': 'Label:',
    'search.empty': 'No results found 🎵', 'album.none': 'No albums found. Run npm run seed to load data.', 'album.error': '⚠️ Could not connect to the API. Make sure the server is running.', 'song.error': '⚠️ Search failed. Make sure the server is running.', 'songs.empty': 'No songs loaded', 'album.meta': 'songs',
    'search.didYouMean': 'Did you mean', 'search.resultsFor': 'Results for', 'search.bySong': 'song', 'search.byAlbum': 'album', 'search.byAuthor': 'author',
    'search.funCloseOptions': 'Very close to the right era... ✨|That was almost a perfect bridge 💫|You are one typo away from the right track 🎶|Swiftie radar says: almost there 🌟',
    'search.funOopsOptions': 'Swiftie radar says you probably meant|Tiny typo, big reputation: maybe it is|Easter egg mode on: try|I can read your mind... maybe you meant'
  }
};

let language = localStorage.getItem('tsLang') || 'es';

export const translate = (key) => messages[language]?.[key] || key;
export function randomTranslation(key) {
  const options = translate(key).split('|').map((item) => item.trim()).filter(Boolean);
  return options[Math.floor(Math.random() * options.length)] || '';
}
export function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });
  const toggle = document.querySelector('#lang-toggle');
  toggle.textContent = language === 'es' ? 'EN' : 'ES';
  toggle.setAttribute('aria-label', language === 'es' ? 'Switch to English' : 'Cambiar a español');
  document.querySelector('#search-input').placeholder = language === 'es'
    ? 'Busca por título, autor o año...'
    : 'Search by title, artist or year...';
}
export function toggleLanguage() {
  language = language === 'es' ? 'en' : 'es';
  localStorage.setItem('tsLang', language);
  applyLanguage();
}
