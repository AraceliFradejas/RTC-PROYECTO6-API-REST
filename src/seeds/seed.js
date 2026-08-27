require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Album = require('../models/Album');
const Song = require('../models/Song');

const makeAlbumCover = (title, eraColor) => {
  const safeTitle = title.length > 22 ? `${title.slice(0, 22)}…` : title;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${eraColor}" />
          <stop offset="100%" stop-color="#121826" />
        </linearGradient>
      </defs>
      <rect width="800" height="800" fill="url(#g)" rx="32"/>
      <circle cx="620" cy="180" r="120" fill="rgba(255,255,255,0.12)"/>
      <circle cx="180" cy="640" r="110" fill="rgba(255,255,255,0.08)"/>
      <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia, serif" font-size="56" fill="#ffffff" font-weight="700">${safeTitle}</text>
      <text x="50%" y="66%" dominant-baseline="middle" text-anchor="middle" font-family="Verdana, sans-serif" font-size="28" fill="rgba(255,255,255,0.9)" letter-spacing="5">TAYLOR SWIFT</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const buildStreamingSearch = (songTitle, albumTitle) => ({
  spotify: `https://open.spotify.com/search/${encodeURIComponent(`${songTitle} Taylor Swift ${albumTitle}`)}`,
  apple: `https://music.apple.com/us/search?term=${encodeURIComponent(`${songTitle} Taylor Swift ${albumTitle}`)}`
});

const albumsData = [
  {
    title: 'Taylor Swift',
    year: 2006,
    coverImage: makeAlbumCover('Taylor Swift', '#5cb3a0'),
    description: 'Álbum debut con una base country-pop que dio inicio a la carrera de Taylor Swift.',
    era: 'Debut Era',
    eraColor: '#5cb3a0',
    label: 'Big Machine Records',
    totalTracks: 11
  },
  {
    title: 'Fearless',
    year: 2008,
    coverImage: makeAlbumCover('Fearless', '#f5d76e'),
    description: 'Segundo álbum de estudio, con una mezcla de country y pop que consolidó su voz en la escena internacional.',
    era: 'Fearless Era',
    eraColor: '#f5d76e',
    label: 'Big Machine Records',
    totalTracks: 13
  },
  {
    title: 'Fearless (Taylor\'s Version)',
    year: 2021,
    coverImage: makeAlbumCover("Fearless (TV)", '#f0d66d'),
    description: 'Regrabación del clásico de 2008 con una nueva energía y una mezcla más detallada de sus versiones originales.',
    era: 'Taylor\'s Version',
    eraColor: '#f0d66d',
    label: 'Republic Records',
    totalTracks: 26
  },
  {
    title: 'Speak Now',
    year: 2010,
    coverImage: makeAlbumCover('Speak Now', '#9b59b6'),
    description: 'Tercer álbum escrito íntegramente por Taylor Swift, con un sonido más confesional y emocional.',
    era: 'Speak Now Era',
    eraColor: '#9b59b6',
    label: 'Big Machine Records',
    totalTracks: 14
  },
  {
    title: 'Speak Now (Taylor\'s Version)',
    year: 2023,
    coverImage: makeAlbumCover("Speak Now (TV)", '#9f7aea'),
    description: 'La regrabación de un álbum que representa una de las etapas más narrativas y personales de su carrera.',
    era: 'Taylor\'s Version',
    eraColor: '#9f7aea',
    label: 'Republic Records',
    totalTracks: 22
  },
  {
    title: 'Red',
    year: 2012,
    coverImage: makeAlbumCover('Red', '#c0392b'),
    description: 'Álbum de transición hacia el pop, con una mezcla de intensidad emocional, country y producción más amplia.',
    era: 'Red Era',
    eraColor: '#c0392b',
    label: 'Big Machine Records',
    totalTracks: 16
  },
  {
    title: 'Red (Taylor\'s Version)',
    year: 2021,
    coverImage: makeAlbumCover("Red (TV)", '#c1666b'),
    description: 'Versión regrabada de Red con canciones extendidas, nuevas colaboraciones y una recreación más íntima del material original.',
    era: 'Taylor\'s Version',
    eraColor: '#c1666b',
    label: 'Republic Records',
    totalTracks: 30
  },
  {
    title: '1989',
    year: 2014,
    coverImage: makeAlbumCover('1989', '#85c1e9'),
    description: 'Reinvento pop y sintético del sonido de Taylor Swift, con una mirada más contemporánea y global.',
    era: '1989 Era',
    eraColor: '#85c1e9',
    label: 'Big Machine Records',
    totalTracks: 13
  },
  {
    title: '1989 (Taylor\'s Version)',
    year: 2023,
    coverImage: makeAlbumCover("1989 (TV)", '#6aa8d8'),
    description: 'La versión regrabada de 1989, revisada con un brillo pop más nítido y una gran presencia en toda la discografía.',
    era: 'Taylor\'s Version',
    eraColor: '#6aa8d8',
    label: 'Republic Records',
    totalTracks: 21
  },
  {
    title: 'Reputation',
    year: 2017,
    coverImage: makeAlbumCover('Reputation', '#2c3e50'),
    description: 'Álbum oscuro, abrasivo y muy definido por la tensión entre imagen pública y autenticidad personal.',
    era: 'Reputation Era',
    eraColor: '#2c3e50',
    label: 'Big Machine Records',
    totalTracks: 15
  },
  {
    title: 'Lover',
    year: 2019,
    coverImage: makeAlbumCover('Lover', '#f8a5c2'),
    description: 'Un disco más cálido y romántico, con tonos pastel y un enfoque más directo en la vulnerabilidad.',
    era: 'Lover Era',
    eraColor: '#f8a5c2',
    label: 'Republic Records',
    totalTracks: 18
  },
  {
    title: 'Folklore',
    year: 2020,
    coverImage: makeAlbumCover('Folklore', '#bdc3c7'),
    description: 'Álbum de indie folk y narrativa íntima, lanzado de sorpresa y alineado con una visión más contemplativa.',
    era: 'Folklore Era',
    eraColor: '#bdc3c7',
    label: 'Republic Records',
    totalTracks: 16
  },
  {
    title: 'Evermore',
    year: 2020,
    coverImage: makeAlbumCover('Evermore', '#a0522d'),
    description: 'Hermano creativo de Folklore, con un sonido aún más cinematográfico y orientado a la historia.',
    era: 'Evermore Era',
    eraColor: '#a0522d',
    label: 'Republic Records',
    totalTracks: 15
  },
  {
    title: 'Midnights',
    year: 2022,
    coverImage: makeAlbumCover('Midnights', '#1a237e'),
    description: 'Álbum nocturno que explora la ansiedad, el deseo y el autoanálisis desde una perspectiva pop sintética.',
    era: 'Midnights Era',
    eraColor: '#1a237e',
    label: 'Republic Records',
    totalTracks: 13
  },
  {
    title: 'The Tortured Poets Department',
    year: 2024,
    coverImage: makeAlbumCover('TTPD', '#d4a373'),
    description: 'Proyecto más personal y narrativo de la etapa reciente, con una mezcla de confesión, poesía y pop contundente.',
    era: 'TTPD Era',
    eraColor: '#d4a373',
    label: 'Republic Records',
    totalTracks: 31
  },
  {
    title: 'The Life of a Showgirl',
    year: 2025,
    coverImage: makeAlbumCover('Showgirl', '#f7c948'),
    description: 'Álbum más reciente, con una estética más teatral y un enfoque teatral de la narración personal y escénica.',
    era: 'Showgirl Era',
    eraColor: '#f7c948',
    label: 'Republic Records',
    totalTracks: 12
  }
];

const songsData = {
  'Taylor Swift': [
    { title: 'Tim McGraw', author: 'Taylor Swift', duration: '3:54', trackNumber: 1, isPopular: true, year: 2006 },
    { title: 'Picture to Burn', author: 'Taylor Swift', duration: '2:55', trackNumber: 2, isPopular: true, year: 2006 },
    { title: 'Teardrops on My Guitar', author: 'Taylor Swift', duration: '3:33', trackNumber: 3, isPopular: true, year: 2006 },
    { title: 'A Place in This World', author: 'Taylor Swift', duration: '3:20', trackNumber: 4, isPopular: false, year: 2006 },
    { title: 'Cold as You', author: 'Taylor Swift', duration: '4:00', trackNumber: 5, isPopular: false, year: 2006 },
    { title: 'The Outside', author: 'Taylor Swift', duration: '3:25', trackNumber: 6, isPopular: false, year: 2006 },
    { title: 'Tied Together with a Smile', author: 'Taylor Swift', duration: '4:11', trackNumber: 7, isPopular: false, year: 2006 },
    { title: 'Stay Stay Stay', author: 'Taylor Swift', duration: '4:25', trackNumber: 8, isPopular: true, year: 2006 },
    { title: 'Shut Up and Drive', author: 'Taylor Swift', duration: '3:52', trackNumber: 9, isPopular: true, year: 2006 },
    { title: 'I Heart?', author: 'Taylor Swift', duration: '3:17', trackNumber: 10, isPopular: false, year: 2006 },
    { title: 'Should\'ve Said No', author: 'Taylor Swift', duration: '4:03', trackNumber: 11, isPopular: true, year: 2006 }
  ],

  'Fearless': [
    { title: 'Fearless', author: 'Taylor Swift', duration: '4:01', trackNumber: 1, isPopular: true, year: 2008 },
    { title: 'Fifteen', author: 'Taylor Swift', duration: '4:54', trackNumber: 2, isPopular: true, year: 2008 },
    { title: 'Love Story', author: 'Taylor Swift', duration: '3:55', trackNumber: 3, isPopular: true, year: 2008 },
    { title: 'Hey Stephen', author: 'Taylor Swift', duration: '4:14', trackNumber: 4, isPopular: false, year: 2008 },
    { title: 'White Horse', author: 'Taylor Swift', duration: '3:55', trackNumber: 5, isPopular: true, year: 2008 },
    { title: 'You Belong with Me', author: 'Taylor Swift', duration: '3:52', trackNumber: 6, isPopular: true, year: 2008 },
    { title: 'Breathe', author: 'Taylor Swift', duration: '4:24', trackNumber: 7, isPopular: false, year: 2008 },
    { title: 'Tell Me Why', author: 'Taylor Swift', duration: '3:20', trackNumber: 8, isPopular: false, year: 2008 },
    { title: 'You\'re Not Sorry', author: 'Taylor Swift', duration: '4:20', trackNumber: 9, isPopular: true, year: 2008 },
    { title: 'The Way I Loved You', author: 'Taylor Swift', duration: '4:03', trackNumber: 10, isPopular: false, year: 2008 },
    { title: 'Forever & Always', author: 'Taylor Swift', duration: '3:46', trackNumber: 11, isPopular: true, year: 2008 },
    { title: 'The Best Day', author: 'Taylor Swift', duration: '4:06', trackNumber: 12, isPopular: false, year: 2008 },
    { title: 'Change', author: 'Taylor Swift', duration: '4:40', trackNumber: 13, isPopular: true, year: 2008 }
  ],

  'Fearless (Taylor\'s Version)': [
    { title: 'Fearless (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:01', trackNumber: 1, isPopular: true, year: 2021 },
    { title: 'Fifteen (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:54', trackNumber: 2, isPopular: true, year: 2021 },
    { title: 'Love Story (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:56', trackNumber: 3, isPopular: true, year: 2021 },
    { title: 'Hey Stephen (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:14', trackNumber: 4, isPopular: false, year: 2021 },
    { title: 'White Horse (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:55', trackNumber: 5, isPopular: true, year: 2021 },
    { title: 'You Belong with Me (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:52', trackNumber: 6, isPopular: true, year: 2021 },
    { title: 'Breathe (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:24', trackNumber: 7, isPopular: false, year: 2021 },
    { title: 'Tell Me Why (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:20', trackNumber: 8, isPopular: false, year: 2021 },
    { title: 'You\'re Not Sorry (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:20', trackNumber: 9, isPopular: true, year: 2021 },
    { title: 'The Way I Loved You (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:03', trackNumber: 10, isPopular: false, year: 2021 },
    { title: 'Forever & Always (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:46', trackNumber: 11, isPopular: true, year: 2021 },
    { title: 'The Best Day (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:06', trackNumber: 12, isPopular: false, year: 2021 },
    { title: 'Change (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:40', trackNumber: 13, isPopular: true, year: 2021 },
    { title: 'Jump Then Fall (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:38', trackNumber: 14, isPopular: false, year: 2021 },
    { title: 'Untouchable (Taylor\'s Version)', author: 'Taylor Swift', duration: '5:11', trackNumber: 15, isPopular: false, year: 2021 },
    { title: 'Forever & Always (Piano Version)', author: 'Taylor Swift', duration: '4:23', trackNumber: 16, isPopular: false, year: 2021 },
    { title: 'Come In with the Rain (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:43', trackNumber: 17, isPopular: false, year: 2021 },
    { title: 'Superstar (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:21', trackNumber: 18, isPopular: false, year: 2021 },
    { title: 'The Other Side of the Door (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:58', trackNumber: 19, isPopular: false, year: 2021 },
    { title: 'Today Was a Fairytale (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:07', trackNumber: 20, isPopular: false, year: 2021 },
    { title: 'You All Over Me (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:42', trackNumber: 21, isPopular: true, year: 2021 },
    { title: 'Mr. Perfectly Fine (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:38', trackNumber: 22, isPopular: true, year: 2021 },
    { title: 'We Were Happy (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:03', trackNumber: 23, isPopular: false, year: 2021 },
    { title: 'That\'s When (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:09', trackNumber: 24, isPopular: false, year: 2021 },
    { title: 'The Last Time (Taylor\'s Version)', author: 'Taylor Swift, Gary Lightbody', duration: '4:59', trackNumber: 25, isPopular: false, year: 2021 },
    { title: 'Bye Bye Baby (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:02', trackNumber: 26, isPopular: false, year: 2021 }
  ],

  'Speak Now': [
    { title: 'Mine', author: 'Taylor Swift', duration: '3:50', trackNumber: 1, isPopular: true, year: 2010 },
    { title: 'Sparks Fly', author: 'Taylor Swift', duration: '4:20', trackNumber: 2, isPopular: true, year: 2010 },
    { title: 'Back to December', author: 'Taylor Swift', duration: '4:53', trackNumber: 3, isPopular: true, year: 2010 },
    { title: 'Speak Now', author: 'Taylor Swift', duration: '4:00', trackNumber: 4, isPopular: true, year: 2010 },
    { title: 'Dear John', author: 'Taylor Swift', duration: '6:43', trackNumber: 5, isPopular: false, year: 2010 },
    { title: 'Mean', author: 'Taylor Swift', duration: '3:58', trackNumber: 6, isPopular: true, year: 2010 },
    { title: 'The Story of Us', author: 'Taylor Swift', duration: '4:26', trackNumber: 7, isPopular: true, year: 2010 },
    { title: 'Never Grow Up', author: 'Taylor Swift', duration: '4:50', trackNumber: 8, isPopular: false, year: 2010 },
    { title: 'Enchanted', author: 'Taylor Swift', duration: '5:52', trackNumber: 9, isPopular: true, year: 2010 },
    { title: 'Better than Revenge', author: 'Taylor Swift', duration: '3:43', trackNumber: 10, isPopular: false, year: 2010 },
    { title: 'Innocent', author: 'Taylor Swift', duration: '5:02', trackNumber: 11, isPopular: false, year: 2010 },
    { title: 'Haunted', author: 'Taylor Swift', duration: '4:02', trackNumber: 12, isPopular: false, year: 2010 },
    { title: 'Last Kiss', author: 'Taylor Swift', duration: '6:08', trackNumber: 13, isPopular: false, year: 2010 },
    { title: 'Long Live', author: 'Taylor Swift', duration: '5:58', trackNumber: 14, isPopular: true, year: 2010 }
  ],

  'Speak Now (Taylor\'s Version)': [
    { title: 'Mine (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:50', trackNumber: 1, isPopular: true, year: 2023 },
    { title: 'Sparks Fly (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:20', trackNumber: 2, isPopular: true, year: 2023 },
    { title: 'Back to December (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:53', trackNumber: 3, isPopular: true, year: 2023 },
    { title: 'Speak Now (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:00', trackNumber: 4, isPopular: true, year: 2023 },
    { title: 'Dear John (Taylor\'s Version)', author: 'Taylor Swift', duration: '6:43', trackNumber: 5, isPopular: false, year: 2023 },
    { title: 'Mean (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:58', trackNumber: 6, isPopular: true, year: 2023 },
    { title: 'The Story of Us (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:26', trackNumber: 7, isPopular: true, year: 2023 },
    { title: 'Never Grow Up (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:50', trackNumber: 8, isPopular: false, year: 2023 },
    { title: 'Enchanted (Taylor\'s Version)', author: 'Taylor Swift', duration: '5:52', trackNumber: 9, isPopular: true, year: 2023 },
    { title: 'Better than Revenge (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:43', trackNumber: 10, isPopular: false, year: 2023 },
    { title: 'Innocent (Taylor\'s Version)', author: 'Taylor Swift', duration: '5:02', trackNumber: 11, isPopular: false, year: 2023 },
    { title: 'Haunted (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:02', trackNumber: 12, isPopular: false, year: 2023 },
    { title: 'Last Kiss (Taylor\'s Version)', author: 'Taylor Swift', duration: '6:08', trackNumber: 13, isPopular: false, year: 2023 },
    { title: 'Long Live (Taylor\'s Version)', author: 'Taylor Swift', duration: '5:58', trackNumber: 14, isPopular: true, year: 2023 },
    { title: 'Ours (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:55', trackNumber: 15, isPopular: false, year: 2023 },
    { title: 'Superman (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:34', trackNumber: 16, isPopular: false, year: 2023 },
    { title: 'Electric Touch (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift, Fall Out Boy', duration: '4:26', trackNumber: 17, isPopular: true, year: 2023 },
    { title: 'When Emma Falls in Love (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '4:12', trackNumber: 18, isPopular: false, year: 2023 },
    { title: 'I Can See You (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '4:33', trackNumber: 19, isPopular: true, year: 2023 },
    { title: 'Castles Crumbling (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift, Hayley Williams', duration: '5:06', trackNumber: 20, isPopular: false, year: 2023 },
    { title: 'Foolish One (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '5:11', trackNumber: 21, isPopular: false, year: 2023 },
    { title: 'Timeless (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '5:21', trackNumber: 22, isPopular: true, year: 2023 }
  ],

  'Red': [
    { title: 'State of Grace', author: 'Taylor Swift', duration: '4:55', trackNumber: 1, isPopular: true, year: 2012 },
    { title: 'Red', author: 'Taylor Swift', duration: '3:43', trackNumber: 2, isPopular: true, year: 2012 },
    { title: 'Treacherous', author: 'Taylor Swift', duration: '4:02', trackNumber: 3, isPopular: false, year: 2012 },
    { title: 'I Knew You Were Trouble', author: 'Taylor Swift', duration: '3:39', trackNumber: 4, isPopular: true, year: 2012 },
    { title: 'All Too Well', author: 'Taylor Swift', duration: '5:29', trackNumber: 5, isPopular: true, year: 2012 },
    { title: '22', author: 'Taylor Swift', duration: '3:52', trackNumber: 6, isPopular: true, year: 2012 },
    { title: 'I Almost Do', author: 'Taylor Swift', duration: '4:04', trackNumber: 7, isPopular: false, year: 2012 },
    { title: 'We Are Never Ever Getting Back Together', author: 'Taylor Swift', duration: '3:13', trackNumber: 8, isPopular: true, year: 2012 },
    { title: 'Stay Stay Stay', author: 'Taylor Swift', duration: '3:25', trackNumber: 9, isPopular: false, year: 2012 },
    { title: 'The Last Time', author: 'Taylor Swift, Gary Lightbody', duration: '4:59', trackNumber: 10, isPopular: true, year: 2012 },
    { title: 'Holy Ground', author: 'Taylor Swift', duration: '3:22', trackNumber: 11, isPopular: true, year: 2012 },
    { title: 'Sad Beautiful Tragic', author: 'Taylor Swift', duration: '4:44', trackNumber: 12, isPopular: false, year: 2012 },
    { title: 'The Lucky One', author: 'Taylor Swift', duration: '4:00', trackNumber: 13, isPopular: false, year: 2012 },
    { title: 'Everything Has Changed', author: 'Taylor Swift, Ed Sheeran', duration: '4:05', trackNumber: 14, isPopular: true, year: 2012 },
    { title: 'Starlight', author: 'Taylor Swift', duration: '3:40', trackNumber: 15, isPopular: false, year: 2012 },
    { title: 'Begin Again', author: 'Taylor Swift', duration: '3:58', trackNumber: 16, isPopular: true, year: 2012 }
  ],

  'Red (Taylor\'s Version)': [
    { title: 'State of Grace (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:55', trackNumber: 1, isPopular: true, year: 2021 },
    { title: 'Red (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:43', trackNumber: 2, isPopular: true, year: 2021 },
    { title: 'Treacherous (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:02', trackNumber: 3, isPopular: false, year: 2021 },
    { title: 'I Knew You Were Trouble (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:39', trackNumber: 4, isPopular: true, year: 2021 },
    { title: 'All Too Well (Taylor\'s Version)', author: 'Taylor Swift', duration: '5:29', trackNumber: 5, isPopular: true, year: 2021 },
    { title: '22 (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:52', trackNumber: 6, isPopular: true, year: 2021 },
    { title: 'I Almost Do (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:04', trackNumber: 7, isPopular: false, year: 2021 },
    { title: 'We Are Never Ever Getting Back Together (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:13', trackNumber: 8, isPopular: true, year: 2021 },
    { title: 'Stay Stay Stay (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:25', trackNumber: 9, isPopular: false, year: 2021 },
    { title: 'The Last Time (Taylor\'s Version)', author: 'Taylor Swift, Gary Lightbody', duration: '4:59', trackNumber: 10, isPopular: true, year: 2021 },
    { title: 'Holy Ground (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:22', trackNumber: 11, isPopular: true, year: 2021 },
    { title: 'Sad Beautiful Tragic (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:44', trackNumber: 12, isPopular: false, year: 2021 },
    { title: 'The Lucky One (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:00', trackNumber: 13, isPopular: false, year: 2021 },
    { title: 'Everything Has Changed (Taylor\'s Version)', author: 'Taylor Swift, Ed Sheeran', duration: '4:05', trackNumber: 14, isPopular: true, year: 2021 },
    { title: 'Starlight (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:40', trackNumber: 15, isPopular: false, year: 2021 },
    { title: 'Begin Again (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:58', trackNumber: 16, isPopular: true, year: 2021 },
    { title: 'The Moment I Knew (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:45', trackNumber: 17, isPopular: false, year: 2021 },
    { title: 'Come Back...Be Here (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:43', trackNumber: 18, isPopular: false, year: 2021 },
    { title: 'Girl at Home (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:40', trackNumber: 19, isPopular: false, year: 2021 },
    { title: 'State of Grace (Acoustic Version) (Taylor\'s Version)', author: 'Taylor Swift', duration: '5:21', trackNumber: 20, isPopular: false, year: 2021 },
    { title: 'Ronan (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:24', trackNumber: 21, isPopular: false, year: 2021 },
    { title: 'Better Man (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '4:57', trackNumber: 22, isPopular: true, year: 2021 },
    { title: 'Nothing New (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift, Phoebe Bridgers', duration: '4:18', trackNumber: 23, isPopular: true, year: 2021 },
    { title: 'Babe (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '3:44', trackNumber: 24, isPopular: false, year: 2021 },
    { title: 'Message in a Bottle (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '3:45', trackNumber: 25, isPopular: true, year: 2021 },
    { title: 'I Bet You Think About Me (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift, Chris Stapleton', duration: '4:45', trackNumber: 26, isPopular: true, year: 2021 },
    { title: 'Forever Winter (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '4:23', trackNumber: 27, isPopular: false, year: 2021 },
    { title: 'Run (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift, Ed Sheeran', duration: '4:00', trackNumber: 28, isPopular: false, year: 2021 },
    { title: 'The Very First Night (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '3:20', trackNumber: 29, isPopular: true, year: 2021 },
    { title: 'All Too Well (10 Minute Version) (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '10:13', trackNumber: 30, isPopular: true, year: 2021 }
  ],

  '1989': [
    { title: 'Welcome to New York', author: 'Taylor Swift', duration: '3:32', trackNumber: 1, isPopular: true, year: 2014 },
    { title: 'Blank Space', author: 'Taylor Swift', duration: '3:51', trackNumber: 2, isPopular: true, year: 2014 },
    { title: 'Style', author: 'Taylor Swift', duration: '3:51', trackNumber: 3, isPopular: true, year: 2014 },
    { title: 'Out of the Woods', author: 'Taylor Swift', duration: '3:44', trackNumber: 4, isPopular: true, year: 2014 },
    { title: 'All You Had to Do Was Stay', author: 'Taylor Swift', duration: '3:13', trackNumber: 5, isPopular: false, year: 2014 },
    { title: 'Shake It Off', author: 'Taylor Swift', duration: '3:39', trackNumber: 6, isPopular: true, year: 2014 },
    { title: 'I Wish You Would', author: 'Taylor Swift', duration: '3:27', trackNumber: 7, isPopular: false, year: 2014 },
    { title: 'Bad Blood', author: 'Taylor Swift', duration: '3:31', trackNumber: 8, isPopular: true, year: 2014 },
    { title: 'Wildest Dreams', author: 'Taylor Swift', duration: '3:40', trackNumber: 9, isPopular: true, year: 2014 },
    { title: 'How You Get the Girl', author: 'Taylor Swift', duration: '2:45', trackNumber: 10, isPopular: false, year: 2014 },
    { title: 'This Love', author: 'Taylor Swift', duration: '3:19', trackNumber: 11, isPopular: false, year: 2014 },
    { title: 'I Know Places', author: 'Taylor Swift', duration: '3:15', trackNumber: 12, isPopular: false, year: 2014 },
    { title: 'Clean', author: 'Taylor Swift', duration: '4:31', trackNumber: 13, isPopular: false, year: 2014 }
  ],

  '1989 (Taylor\'s Version)': [
    { title: 'Welcome to New York (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:32', trackNumber: 1, isPopular: true, year: 2023 },
    { title: 'Blank Space (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:51', trackNumber: 2, isPopular: true, year: 2023 },
    { title: 'Style (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:51', trackNumber: 3, isPopular: true, year: 2023 },
    { title: 'Out of the Woods (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:44', trackNumber: 4, isPopular: true, year: 2023 },
    { title: 'All You Had to Do Was Stay (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:13', trackNumber: 5, isPopular: false, year: 2023 },
    { title: 'Shake It Off (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:39', trackNumber: 6, isPopular: true, year: 2023 },
    { title: 'I Wish You Would (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:27', trackNumber: 7, isPopular: false, year: 2023 },
    { title: 'Bad Blood (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:19', trackNumber: 8, isPopular: true, year: 2023 },
    { title: 'Wildest Dreams (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:40', trackNumber: 9, isPopular: true, year: 2023 },
    { title: 'How You Get the Girl (Taylor\'s Version)', author: 'Taylor Swift', duration: '2:45', trackNumber: 10, isPopular: false, year: 2023 },
    { title: 'This Love (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:19', trackNumber: 11, isPopular: false, year: 2023 },
    { title: 'I Know Places (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:15', trackNumber: 12, isPopular: false, year: 2023 },
    { title: 'Clean (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:31', trackNumber: 13, isPopular: false, year: 2023 },
    { title: 'Wonderland (Taylor\'s Version)', author: 'Taylor Swift', duration: '2:12', trackNumber: 14, isPopular: false, year: 2023 },
    { title: 'You Are In Love (Taylor\'s Version)', author: 'Taylor Swift', duration: '4:27', trackNumber: 15, isPopular: true, year: 2023 },
    { title: 'New Romantics (Taylor\'s Version)', author: 'Taylor Swift', duration: '3:50', trackNumber: 16, isPopular: true, year: 2023 },
    { title: '\"Slut!\" (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '3:00', trackNumber: 17, isPopular: true, year: 2023 },
    { title: 'Say Don\'t Go (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '4:39', trackNumber: 18, isPopular: true, year: 2023 },
    { title: 'Now That We Don\'t Talk (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '2:26', trackNumber: 19, isPopular: true, year: 2023 },
    { title: 'Suburban Legends (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '2:51', trackNumber: 20, isPopular: false, year: 2023 },
    { title: 'Is It Over Now? (Taylor\'s Version) (From the Vault)', author: 'Taylor Swift', duration: '3:49', trackNumber: 21, isPopular: true, year: 2023 }
  ],

  'Reputation': [
    { title: '...Ready for It?', author: 'Taylor Swift', duration: '3:28', trackNumber: 1, isPopular: true, year: 2017 },
    { title: 'End Game', author: 'Taylor Swift', duration: '4:04', trackNumber: 2, isPopular: true, year: 2017 },
    { title: 'I Did Something Bad', author: 'Taylor Swift', duration: '3:58', trackNumber: 3, isPopular: true, year: 2017 },
    { title: 'Don\'t Blame Me', author: 'Taylor Swift', duration: '3:20', trackNumber: 4, isPopular: true, year: 2017 },
    { title: 'Delicate', author: 'Taylor Swift', duration: '3:52', trackNumber: 5, isPopular: true, year: 2017 },
    { title: 'Look What You Made Me Do', author: 'Taylor Swift', duration: '3:31', trackNumber: 6, isPopular: true, year: 2017 },
    { title: 'So It Goes...', author: 'Taylor Swift', duration: '3:55', trackNumber: 7, isPopular: false, year: 2017 },
    { title: 'Gorgeous', author: 'Taylor Swift', duration: '3:29', trackNumber: 8, isPopular: true, year: 2017 },
    { title: 'Getaway Car', author: 'Taylor Swift', duration: '3:53', trackNumber: 9, isPopular: true, year: 2017 },
    { title: 'King of My Heart', author: 'Taylor Swift', duration: '3:34', trackNumber: 10, isPopular: false, year: 2017 },
    { title: 'Dancing with Our Hands Tied', author: 'Taylor Swift', duration: '3:31', trackNumber: 11, isPopular: false, year: 2017 },
    { title: 'Dress', author: 'Taylor Swift', duration: '3:50', trackNumber: 12, isPopular: true, year: 2017 },
    { title: 'This Is Why We Can\'t Have Nice Things', author: 'Taylor Swift', duration: '3:27', trackNumber: 13, isPopular: true, year: 2017 },
    { title: 'Call It What You Want', author: 'Taylor Swift', duration: '3:23', trackNumber: 14, isPopular: true, year: 2017 },
    { title: 'New Year\'s Day', author: 'Taylor Swift', duration: '3:55', trackNumber: 15, isPopular: false, year: 2017 }
  ],

  'Lover': [
    { title: 'I Forgot That You Existed', author: 'Taylor Swift', duration: '2:51', trackNumber: 1, isPopular: true, year: 2019 },
    { title: 'Cruel Summer', author: 'Taylor Swift', duration: '2:58', trackNumber: 2, isPopular: true, year: 2019 },
    { title: 'Lover', author: 'Taylor Swift', duration: '3:41', trackNumber: 3, isPopular: true, year: 2019 },
    { title: 'The Man', author: 'Taylor Swift', duration: '3:10', trackNumber: 4, isPopular: true, year: 2019 },
    { title: 'The Archer', author: 'Taylor Swift', duration: '3:31', trackNumber: 5, isPopular: false, year: 2019 },
    { title: 'I Think He Knows', author: 'Taylor Swift', duration: '2:44', trackNumber: 6, isPopular: false, year: 2019 },
    { title: 'Miss Americana & the Heartbreak Prince', author: 'Taylor Swift', duration: '3:54', trackNumber: 7, isPopular: true, year: 2019 },
    { title: 'Paper Rings', author: 'Taylor Swift', duration: '3:42', trackNumber: 8, isPopular: true, year: 2019 },
    { title: 'Cornelia Street', author: 'Taylor Swift', duration: '4:47', trackNumber: 9, isPopular: true, year: 2019 },
    { title: 'Death by a Thousand Cuts', author: 'Taylor Swift', duration: '3:18', trackNumber: 10, isPopular: true, year: 2019 },
    { title: 'London Boy', author: 'Taylor Swift', duration: '3:10', trackNumber: 11, isPopular: true, year: 2019 },
    { title: 'Soon You\'ll Get Better', author: 'Taylor Swift, The Chicks', duration: '3:21', trackNumber: 12, isPopular: false, year: 2019 },
    { title: 'False God', author: 'Taylor Swift', duration: '3:20', trackNumber: 13, isPopular: false, year: 2019 },
    { title: 'You Need to Calm Down', author: 'Taylor Swift', duration: '2:51', trackNumber: 14, isPopular: true, year: 2019 },
    { title: 'Afterglow', author: 'Taylor Swift', duration: '3:43', trackNumber: 15, isPopular: false, year: 2019 },
    { title: 'ME!', author: 'Taylor Swift, Brendon Urie', duration: '3:13', trackNumber: 16, isPopular: true, year: 2019 },
    { title: 'It\'s Nice to Have a Friend', author: 'Taylor Swift', duration: '2:30', trackNumber: 17, isPopular: false, year: 2019 },
    { title: 'Daylight', author: 'Taylor Swift', duration: '4:53', trackNumber: 18, isPopular: true, year: 2019 }
  ],

  'Folklore': [
    { title: 'The 1', author: 'Taylor Swift', duration: '3:30', trackNumber: 1, isPopular: true, year: 2020 },
    { title: 'Cardigan', author: 'Taylor Swift', duration: '3:59', trackNumber: 2, isPopular: true, year: 2020 },
    { title: 'The Last Great American Dynasty', author: 'Taylor Swift', duration: '3:51', trackNumber: 3, isPopular: true, year: 2020 },
    { title: 'Exile', author: 'Taylor Swift, Bon Iver', duration: '4:45', trackNumber: 4, isPopular: true, year: 2020 },
    { title: 'My Tears Ricochet', author: 'Taylor Swift', duration: '4:15', trackNumber: 5, isPopular: false, year: 2020 },
    { title: 'Mirrorball', author: 'Taylor Swift', duration: '3:29', trackNumber: 6, isPopular: true, year: 2020 },
    { title: 'Seven', author: 'Taylor Swift', duration: '3:28', trackNumber: 7, isPopular: false, year: 2020 },
    { title: 'August', author: 'Taylor Swift', duration: '4:21', trackNumber: 8, isPopular: true, year: 2020 },
    { title: 'This Is Me Trying', author: 'Taylor Swift', duration: '3:15', trackNumber: 9, isPopular: false, year: 2020 },
    { title: 'Illicit Affairs', author: 'Taylor Swift', duration: '3:10', trackNumber: 10, isPopular: false, year: 2020 },
    { title: 'Invisible String', author: 'Taylor Swift', duration: '4:12', trackNumber: 11, isPopular: true, year: 2020 },
    { title: 'Mad Woman', author: 'Taylor Swift', duration: '3:57', trackNumber: 12, isPopular: true, year: 2020 },
    { title: 'Epiphany', author: 'Taylor Swift', duration: '4:49', trackNumber: 13, isPopular: false, year: 2020 },
    { title: 'Betty', author: 'Taylor Swift', duration: '4:54', trackNumber: 14, isPopular: true, year: 2020 },
    { title: 'Peace', author: 'Taylor Swift', duration: '3:54', trackNumber: 15, isPopular: false, year: 2020 },
    { title: 'Hoax', author: 'Taylor Swift', duration: '3:40', trackNumber: 16, isPopular: false, year: 2020 }
  ],

  'Evermore': [
    { title: 'Willow', author: 'Taylor Swift', duration: '3:34', trackNumber: 1, isPopular: true, year: 2020 },
    { title: 'Champagne Problems', author: 'Taylor Swift', duration: '4:04', trackNumber: 2, isPopular: true, year: 2020 },
    { title: 'Gold Rush', author: 'Taylor Swift', duration: '3:14', trackNumber: 3, isPopular: false, year: 2020 },
    { title: "'Tis the Damn Season", author: 'Taylor Swift', duration: '3:49', trackNumber: 4, isPopular: true, year: 2020 },
    { title: 'Tolerate It', author: 'Taylor Swift', duration: '4:05', trackNumber: 5, isPopular: false, year: 2020 },
    { title: 'No Body, No Crime', author: 'Taylor Swift', duration: '3:35', trackNumber: 6, isPopular: true, year: 2020 },
    { title: 'Happiness', author: 'Taylor Swift', duration: '5:15', trackNumber: 7, isPopular: false, year: 2020 },
    { title: 'Dorothea', author: 'Taylor Swift', duration: '3:45', trackNumber: 8, isPopular: false, year: 2020 },
    { title: 'Coney Island', author: 'Taylor Swift', duration: '4:36', trackNumber: 9, isPopular: false, year: 2020 },
    { title: 'Ivy', author: 'Taylor Swift', duration: '4:20', trackNumber: 10, isPopular: false, year: 2020 },
    { title: 'Cowboy like Me', author: 'Taylor Swift', duration: '4:35', trackNumber: 11, isPopular: false, year: 2020 },
    { title: 'Long Story Short', author: 'Taylor Swift', duration: '3:35', trackNumber: 12, isPopular: false, year: 2020 },
    { title: 'Marjorie', author: 'Taylor Swift', duration: '4:17', trackNumber: 13, isPopular: false, year: 2020 },
    { title: 'Closure', author: 'Taylor Swift', duration: '3:00', trackNumber: 14, isPopular: false, year: 2020 },
    { title: 'Evermore', author: 'Taylor Swift', duration: '5:04', trackNumber: 15, isPopular: true, year: 2020 }
  ],

  'Midnights': [
    { title: 'Lavender Haze', author: 'Taylor Swift', duration: '3:22', trackNumber: 1, isPopular: true, year: 2022 },
    { title: 'Maroon', author: 'Taylor Swift', duration: '3:41', trackNumber: 2, isPopular: true, year: 2022 },
    { title: 'Anti-Hero', author: 'Taylor Swift', duration: '3:20', trackNumber: 3, isPopular: true, year: 2022 },
    { title: 'Snow on the Beach', author: 'Taylor Swift', duration: '4:16', trackNumber: 4, isPopular: true, year: 2022 },
    { title: 'You\'re On Your Own, Kid', author: 'Taylor Swift', duration: '3:15', trackNumber: 5, isPopular: true, year: 2022 },
    { title: 'Midnight Rain', author: 'Taylor Swift', duration: '2:54', trackNumber: 6, isPopular: true, year: 2022 },
    { title: 'Question...?', author: 'Taylor Swift', duration: '3:31', trackNumber: 7, isPopular: false, year: 2022 },
    { title: 'Vigilante Shit', author: 'Taylor Swift', duration: '2:44', trackNumber: 8, isPopular: true, year: 2022 },
    { title: 'Bejeweled', author: 'Taylor Swift', duration: '3:14', trackNumber: 9, isPopular: true, year: 2022 },
    { title: 'Labyrinth', author: 'Taylor Swift', duration: '3:09', trackNumber: 10, isPopular: false, year: 2022 },
    { title: 'Karma', author: 'Taylor Swift', duration: '3:24', trackNumber: 11, isPopular: true, year: 2022 },
    { title: 'Sweet Nothing', author: 'Taylor Swift', duration: '3:08', trackNumber: 12, isPopular: false, year: 2022 },
    { title: 'Mastermind', author: 'Taylor Swift', duration: '2:54', trackNumber: 13, isPopular: true, year: 2022 }
  ],

  'The Tortured Poets Department': [
    { title: 'Fortnight', author: 'Taylor Swift', duration: '3:48', trackNumber: 1, isPopular: true, year: 2024 },
    { title: 'The Tortured Poets Department', author: 'Taylor Swift', duration: '4:53', trackNumber: 2, isPopular: true, year: 2024 },
    { title: 'My Boy Only Breaks His Favorite Toys', author: 'Taylor Swift', duration: '3:23', trackNumber: 3, isPopular: false, year: 2024 },
    { title: 'Down Bad', author: 'Taylor Swift', duration: '4:21', trackNumber: 4, isPopular: true, year: 2024 },
    { title: 'So Long, London', author: 'Taylor Swift', duration: '4:22', trackNumber: 5, isPopular: true, year: 2024 },
    { title: 'But Daddy I Love Him', author: 'Taylor Swift', duration: '5:40', trackNumber: 6, isPopular: true, year: 2024 },
    { title: 'Fresh Out the Slammer', author: 'Taylor Swift', duration: '3:30', trackNumber: 7, isPopular: false, year: 2024 },
    { title: 'Florida!!!', author: 'Taylor Swift', duration: '3:35', trackNumber: 8, isPopular: true, year: 2024 },
    { title: 'Guilty as Sin?', author: 'Taylor Swift', duration: '4:14', trackNumber: 9, isPopular: false, year: 2024 },
    { title: 'Who\'s Afraid of Little Old Me?', author: 'Taylor Swift', duration: '5:34', trackNumber: 10, isPopular: true, year: 2024 },
    { title: 'I Can Fix Him (No Really I Can)', author: 'Taylor Swift', duration: '2:36', trackNumber: 11, isPopular: false, year: 2024 },
    { title: 'loml', author: 'Taylor Swift', duration: '4:37', trackNumber: 12, isPopular: false, year: 2024 },
    { title: 'I Can Do It with a Broken Heart', author: 'Taylor Swift', duration: '3:38', trackNumber: 13, isPopular: true, year: 2024 },
    { title: 'The Smallest Man Who Ever Lived', author: 'Taylor Swift', duration: '4:05', trackNumber: 14, isPopular: true, year: 2024 },
    { title: 'The Alchemy', author: 'Taylor Swift', duration: '3:16', trackNumber: 15, isPopular: false, year: 2024 },
    { title: 'Clara Bow', author: 'Taylor Swift', duration: '3:36', trackNumber: 16, isPopular: false, year: 2024 },
    { title: 'The Black Dog', author: 'Taylor Swift', duration: '3:58', trackNumber: 17, isPopular: false, year: 2024 },
    { title: 'imgonnagetyouback', author: 'Taylor Swift', duration: '3:42', trackNumber: 18, isPopular: false, year: 2024 },
    { title: 'The Albatross', author: 'Taylor Swift', duration: '3:03', trackNumber: 19, isPopular: false, year: 2024 },
    { title: 'Chloe or Sam or Sophia or Marcus', author: 'Taylor Swift', duration: '3:33', trackNumber: 20, isPopular: false, year: 2024 },
    { title: 'How Did It End?', author: 'Taylor Swift', duration: '3:58', trackNumber: 21, isPopular: false, year: 2024 },
    { title: 'So High School', author: 'Taylor Swift', duration: '3:48', trackNumber: 22, isPopular: true, year: 2024 },
    { title: 'I Hate It Here', author: 'Taylor Swift', duration: '3:55', trackNumber: 23, isPopular: false, year: 2024 },
    { title: 'thanK you aIMee', author: 'Taylor Swift', duration: '4:23', trackNumber: 24, isPopular: true, year: 2024 },
    { title: 'I Look in People\'s Windows', author: 'Taylor Swift', duration: '2:11', trackNumber: 25, isPopular: false, year: 2024 },
    { title: 'The Prophecy', author: 'Taylor Swift', duration: '4:09', trackNumber: 26, isPopular: false, year: 2024 },
    { title: 'Cassandra', author: 'Taylor Swift', duration: '4:00', trackNumber: 27, isPopular: false, year: 2024 },
    { title: 'Peter', author: 'Taylor Swift', duration: '4:43', trackNumber: 28, isPopular: false, year: 2024 },
    { title: 'The Bolter', author: 'Taylor Swift', duration: '3:58', trackNumber: 29, isPopular: false, year: 2024 },
    { title: 'Robin', author: 'Taylor Swift', duration: '4:00', trackNumber: 30, isPopular: false, year: 2024 },
    { title: 'The Manuscript', author: 'Taylor Swift', duration: '3:45', trackNumber: 31, isPopular: false, year: 2024 }
  ],

  'The Life of a Showgirl': [
    { title: 'The Fate of Ophelia', author: 'Taylor Swift', duration: '3:46', trackNumber: 1, isPopular: true, year: 2025 },
    { title: 'Elizabeth Taylor', author: 'Taylor Swift', duration: '3:28', trackNumber: 2, isPopular: true, year: 2025 },
    { title: 'Opalite', author: 'Taylor Swift', duration: '3:55', trackNumber: 3, isPopular: true, year: 2025 },
    { title: 'Father Figure', author: 'Taylor Swift', duration: '3:32', trackNumber: 4, isPopular: false, year: 2025 },
    { title: 'Eldest Daughter', author: 'Taylor Swift', duration: '4:06', trackNumber: 5, isPopular: false, year: 2025 },
    { title: 'Ruin the Friendship', author: 'Taylor Swift', duration: '3:40', trackNumber: 6, isPopular: false, year: 2025 },
    { title: 'Actually Romantic', author: 'Taylor Swift', duration: '2:43', trackNumber: 7, isPopular: false, year: 2025 },
    { title: 'Wish List', author: 'Taylor Swift', duration: '3:27', trackNumber: 8, isPopular: false, year: 2025 },
    { title: 'Wood', author: 'Taylor Swift', duration: '2:30', trackNumber: 9, isPopular: false, year: 2025 },
    { title: 'Cancelled!', author: 'Taylor Swift', duration: '3:31', trackNumber: 10, isPopular: false, year: 2025 },
    { title: 'Honey', author: 'Taylor Swift', duration: '3:01', trackNumber: 11, isPopular: false, year: 2025 },
    { title: 'The Life of a Showgirl', author: 'Taylor Swift', duration: '4:01', trackNumber: 12, isPopular: true, year: 2025 }
  ]
};

const validateSeedData = () => {
  for (const album of albumsData) {
    const songs = songsData[album.title];
    if (!songs) throw new Error(`No hay canciones definidas para ${album.title}`);

    const normalizedTitles = songs.map((song) => song.title.trim().toLowerCase());
    const trackNumbers = songs.map((song) => song.trackNumber);
    const hasDuplicateTitles = new Set(normalizedTitles).size !== normalizedTitles.length;
    const hasDuplicateTracks = new Set(trackNumbers).size !== trackNumbers.length;

    if (hasDuplicateTitles || hasDuplicateTracks) {
      throw new Error(`La semilla de ${album.title} contiene títulos o números de pista duplicados`);
    }

    if (songs.length !== album.totalTracks) {
      throw new Error(`${album.title} declara ${album.totalTracks} pistas, pero contiene ${songs.length}`);
    }
  }
};

const seedDB = async () => {
  try {
    validateSeedData();
    await connectDB();
    console.log('🎵 Creando o actualizando álbumes...');
    const albums = [];
    for (const albumData of albumsData) {
      const album = await Album.findOneAndUpdate(
        { title: albumData.title },
        { $set: albumData, $setOnInsert: { songs: [] } },
        { new: true, upsert: true, runValidators: true }
      );
      albums.push(album);
    }
    console.log(`✅ ${albums.length} álbumes procesados`);

    console.log('🎶 Creando o actualizando canciones...');
    let totalSongs = 0;

    for (const album of albums) {
      const albumSongs = songsData[album.title];
      if (!albumSongs) continue;

      const songIds = [];
      for (const songData of albumSongs) {
        const streamingUrls = buildStreamingSearch(songData.title, album.title);
        const song = await Song.findOneAndUpdate(
          { album: album._id, trackNumber: songData.trackNumber },
          {
            $set: {
              ...songData,
              album: album._id,
              spotifyUrl: streamingUrls.spotify,
              appleMusicUrl: streamingUrls.apple
            }
          },
          { new: true, upsert: true, runValidators: true }
        );
        songIds.push(song._id);
      }
      totalSongs += songIds.length;
      await Album.findByIdAndUpdate(album._id, {
        $addToSet: { songs: { $each: songIds } }
      });

      console.log(`  📀 ${album.title} (${album.year}) → ${songIds.length} canciones procesadas`);
    }

    console.log(`\n🎉 Seed completado: ${albums.length} álbumes y ${totalSongs} canciones procesadas`);
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDB();
