require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Album = require('../models/Album');
const Song = require('../models/Song');

const albumsData = [
  {
    title: 'Taylor Swift',
    year: 2006,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Taylor_Swift_-_Taylor_Swift.png',
    description: 'El álbum debut homónimo de Taylor Swift, una mezcla de country y pop adolescente que la lanzó al estrellato.',
    era: 'Debut Era',
    eraColor: '#5cb3a0',
    label: 'Big Machine Records',
    totalTracks: 11
  },
  {
    title: 'Fearless',
    year: 2008,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/8/86/Taylor_Swift_-_Fearless.png',
    description: 'El segundo álbum de estudio que incluye éxitos como Love Story y You Belong with Me, ganador del Grammy al Álbum del Año.',
    era: 'Fearless Era',
    eraColor: '#f5d76e',
    label: 'Big Machine Records',
    totalTracks: 13
  },
  {
    title: 'Speak Now',
    year: 2010,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Taylor_Swift_-_Speak_Now_cover.png',
    description: 'Tercer álbum escrito íntegramente por Taylor Swift, un viaje por el country pop y rock que muestra su madurez compositiva.',
    era: 'Speak Now Era',
    eraColor: '#9b59b6',
    label: 'Big Machine Records',
    totalTracks: 14
  },
  {
    title: 'Red',
    year: 2012,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/4/47/Taylor_Swift_-_Red.png',
    description: 'El cuarto álbum marca la transición al pop, con canciones icónicas como We Are Never Getting Back Together y All Too Well.',
    era: 'Red Era',
    eraColor: '#c0392b',
    label: 'Big Machine Records',
    totalTracks: 16
  },
  {
    title: '1989',
    year: 2014,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png',
    description: 'El quinto álbum y su reinvención completa como artista pop, con éxitos mundiales como Shake It Off, Blank Space y Bad Blood.',
    era: '1989 Era',
    eraColor: '#85c1e9',
    label: 'Big Machine Records',
    totalTracks: 13
  },
  {
    title: 'Reputation',
    year: 2017,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Taylor_Swift_-_Reputation.png',
    description: 'Sexto álbum con un giro oscuro y electropop, en respuesta a la narrativa mediática. Incluye Look What You Made Me Do.',
    era: 'Reputation Era',
    eraColor: '#2c3e50',
    label: 'Big Machine Records',
    totalTracks: 15
  },
  {
    title: 'Lover',
    year: 2019,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Taylor_Swift_-_Lover.png',
    description: 'Séptimo álbum que celebra el romance y la alegría con una paleta pastel y pop brillante. Primer álbum bajo Republic Records.',
    era: 'Lover Era',
    eraColor: '#f8a5c2',
    label: 'Republic Records',
    totalTracks: 18
  },
  {
    title: 'Folklore',
    year: 2020,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png',
    description: 'Octavo álbum sorpresa de indie folk y alternative, producido con Aaron Dessner y Jack Antonoff. Grammy al Álbum del Año.',
    era: 'Folklore Era',
    eraColor: '#bdc3c7',
    label: 'Republic Records',
    totalTracks: 16
  },
  {
    title: 'Evermore',
    year: 2020,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Taylor_Swift_-_Evermore.png',
    description: 'Noveno álbum, hermano gemelo de Folklore, continuando el viaje al indie folk con narrativas más complejas.',
    era: 'Evermore Era',
    eraColor: '#a0522d',
    label: 'Republic Records',
    totalTracks: 15
  },
  {
    title: 'Midnights',
    year: 2022,
    coverImage: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png',
    description: 'Décimo álbum de estudio, un viaje por 13 noches de insomnio. Mezcla synth-pop con confesiones personales.',
    era: 'Midnights Era',
    eraColor: '#1a237e',
    label: 'Republic Records',
    totalTracks: 13
  }
];

const songsData = {
  'Taylor Swift': [
    { title: 'Tim McGraw', author: 'Taylor Swift, Liz Rose', duration: '3:54', trackNumber: 1, isPopular: true, year: 2006 },
    { title: 'Picture to Burn', author: 'Taylor Swift, Liz Rose', duration: '2:55', trackNumber: 2, isPopular: true, year: 2006 },
    { title: 'Teardrops on My Guitar', author: 'Taylor Swift, Liz Rose', duration: '3:33', trackNumber: 3, isPopular: true, year: 2006 },
    { title: 'Our Song', author: 'Taylor Swift', duration: '3:21', trackNumber: 6, isPopular: true, year: 2006 },
    { title: 'Should\'ve Said No', author: 'Taylor Swift', duration: '4:03', trackNumber: 11, isPopular: true, year: 2006 }
  ],
  'Fearless': [
    { title: 'Fearless', author: 'Taylor Swift, Liz Rose, Hillary Lindsey', duration: '4:01', trackNumber: 1, isPopular: true, year: 2008 },
    { title: 'Love Story', author: 'Taylor Swift', duration: '3:55', trackNumber: 3, isPopular: true, year: 2008 },
    { title: 'You Belong with Me', author: 'Taylor Swift, Liz Rose', duration: '3:52', trackNumber: 6, isPopular: true, year: 2008 },
    { title: 'White Horse', author: 'Taylor Swift, Liz Rose', duration: '3:55', trackNumber: 7, isPopular: true, year: 2008 },
    { title: 'Fifteen', author: 'Taylor Swift', duration: '4:54', trackNumber: 2, isPopular: true, year: 2008 }
  ],
  'Speak Now': [
    { title: 'Mine', author: 'Taylor Swift', duration: '3:50', trackNumber: 1, isPopular: true, year: 2010 },
    { title: 'Back to December', author: 'Taylor Swift', duration: '4:53', trackNumber: 3, isPopular: true, year: 2010 },
    { title: 'Mean', author: 'Taylor Swift', duration: '3:58', trackNumber: 9, isPopular: true, year: 2010 },
    { title: 'The Story of Us', author: 'Taylor Swift', duration: '4:26', trackNumber: 5, isPopular: true, year: 2010 },
    { title: 'Enchanted', author: 'Taylor Swift', duration: '5:52', trackNumber: 9, isPopular: true, year: 2010 }
  ],
  'Red': [
    { title: 'We Are Never Getting Back Together', author: 'Taylor Swift, Max Martin, Shellback', duration: '3:13', trackNumber: 3, isPopular: true, year: 2012 },
    { title: 'I Knew You Were Trouble', author: 'Taylor Swift, Max Martin, Shellback', duration: '3:39', trackNumber: 5, isPopular: true, year: 2012 },
    { title: 'All Too Well', author: 'Taylor Swift, Liz Rose', duration: '5:29', trackNumber: 5, isPopular: true, year: 2012 },
    { title: '22', author: 'Taylor Swift, Max Martin, Shellback', duration: '3:52', trackNumber: 8, isPopular: true, year: 2012 },
    { title: 'Red', author: 'Taylor Swift', duration: '3:43', trackNumber: 2, isPopular: true, year: 2012 }
  ],
  '1989': [
    { title: 'Shake It Off', author: 'Taylor Swift, Max Martin, Shellback', duration: '3:39', trackNumber: 6, isPopular: true, year: 2014 },
    { title: 'Blank Space', author: 'Taylor Swift, Max Martin, Shellback', duration: '3:51', trackNumber: 2, isPopular: true, year: 2014 },
    { title: 'Style', author: 'Taylor Swift, Max Martin, Shellback, Ali Payami', duration: '3:51', trackNumber: 3, isPopular: true, year: 2014 },
    { title: 'Bad Blood', author: 'Taylor Swift, Max Martin, Shellback', duration: '3:31', trackNumber: 8, isPopular: true, year: 2014 },
    { title: 'Wildest Dreams', author: 'Taylor Swift, Max Martin, Shellback', duration: '3:40', trackNumber: 9, isPopular: true, year: 2014 }
  ],
  'Reputation': [
    { title: 'Look What You Made Me Do', author: 'Taylor Swift, Jack Antonoff, Fred Fairbrass, Richard Fairbrass, Rob Manzoli', duration: '3:31', trackNumber: 6, isPopular: true, year: 2017 },
    { title: '...Ready for It?', author: 'Taylor Swift, Max Martin, Shellback, Ali Payami', duration: '3:28', trackNumber: 1, isPopular: true, year: 2017 },
    { title: 'Delicate', author: 'Taylor Swift, Max Martin, Shellback', duration: '3:52', trackNumber: 5, isPopular: true, year: 2017 },
    { title: 'Gorgeous', author: 'Taylor Swift, Max Martin, Shellback', duration: '3:29', trackNumber: 8, isPopular: true, year: 2017 },
    { title: 'End Game', author: 'Taylor Swift, Ed Sheeran, Future, Max Martin, Shellback', duration: '4:04', trackNumber: 4, isPopular: true, year: 2017 }
  ],
  'Lover': [
    { title: 'Cruel Summer', author: 'Taylor Swift, Jack Antonoff, St. Vincent', duration: '2:58', trackNumber: 2, isPopular: true, year: 2019 },
    { title: 'Lover', author: 'Taylor Swift', duration: '3:41', trackNumber: 3, isPopular: true, year: 2019 },
    { title: 'ME!', author: 'Taylor Swift, Joel Little, Brendon Urie', duration: '3:13', trackNumber: 16, isPopular: true, year: 2019 },
    { title: 'You Need to Calm Down', author: 'Taylor Swift, Joel Little', duration: '2:51', trackNumber: 14, isPopular: true, year: 2019 },
    { title: 'The Archer', author: 'Taylor Swift, Jack Antonoff', duration: '3:31', trackNumber: 5, isPopular: false, year: 2019 }
  ],
  'Folklore': [
    { title: 'Cardigan', author: 'Taylor Swift, Aaron Dessner', duration: '3:59', trackNumber: 2, isPopular: true, year: 2020 },
    { title: 'The 1', author: 'Taylor Swift, Aaron Dessner', duration: '3:30', trackNumber: 1, isPopular: true, year: 2020 },
    { title: 'Exile', author: 'Taylor Swift, Bon Iver, Justin Vernon', duration: '4:45', trackNumber: 4, isPopular: true, year: 2020 },
    { title: 'Betty', author: 'Taylor Swift, William Bowery', duration: '4:54', trackNumber: 14, isPopular: true, year: 2020 },
    { title: 'August', author: 'Taylor Swift, Jack Antonoff', duration: '4:21', trackNumber: 8, isPopular: true, year: 2020 }
  ],
  'Evermore': [
    { title: 'Willow', author: 'Taylor Swift, Aaron Dessner', duration: '3:34', trackNumber: 1, isPopular: true, year: 2020 },
    { title: 'Champagne Problems', author: 'Taylor Swift, William Bowery', duration: '4:04', trackNumber: 2, isPopular: true, year: 2020 },
    { title: 'No Body, No Crime', author: 'Taylor Swift, The Haim', duration: '3:35', trackNumber: 6, isPopular: true, year: 2020 },
    { title: "'Tis the Damn Season", author: 'Taylor Swift, Aaron Dessner', duration: '3:49', trackNumber: 4, isPopular: true, year: 2020 },
    { title: 'Tolerate It', author: 'Taylor Swift, Aaron Dessner', duration: '4:05', trackNumber: 3, isPopular: false, year: 2020 }
  ],
  'Midnights': [
    { title: 'Anti-Hero', author: 'Taylor Swift, Jack Antonoff', duration: '3:20', trackNumber: 3, isPopular: true, year: 2022 },
    { title: 'Lavender Haze', author: 'Taylor Swift, Jack Antonoff, Zoë Kravitz', duration: '3:22', trackNumber: 1, isPopular: true, year: 2022 },
    { title: 'Midnight Rain', author: 'Taylor Swift, Jack Antonoff', duration: '2:54', trackNumber: 5, isPopular: true, year: 2022 },
    { title: 'Bejeweled', author: 'Taylor Swift, Jack Antonoff', duration: '3:14', trackNumber: 9, isPopular: true, year: 2022 },
    { title: 'Karma', author: 'Taylor Swift, Jack Antonoff', duration: '3:24', trackNumber: 11, isPopular: true, year: 2022 }
  ]
};

const seedDB = async () => {
  try {
    await connectDB();
    console.log('🗑️  Limpiando base de datos...');
    await Album.deleteMany({});
    await Song.deleteMany({});
    console.log('✅ Base de datos limpia');

    console.log('🎵 Insertando álbumes...');
    const createdAlbums = await Album.insertMany(albumsData);
    console.log(`✅ ${createdAlbums.length} álbumes creados`);

    console.log('🎶 Insertando canciones...');
    let totalSongs = 0;

    for (const album of createdAlbums) {
      const albumSongs = songsData[album.title];
      if (!albumSongs) continue;

      const songsWithAlbum = albumSongs.map((song) => ({
        ...song,
        album: album._id
      }));

      const createdSongs = await Song.insertMany(songsWithAlbum);
      totalSongs += createdSongs.length;

      // Actualizar el álbum con los IDs de las canciones
      const songIds = createdSongs.map((s) => s._id);
      await Album.findByIdAndUpdate(album._id, {
        $push: { songs: { $each: songIds } }
      });

      console.log(`  📀 ${album.title} (${album.year}) → ${createdSongs.length} canciones`);
    }

    console.log(`\n🎉 Seed completado: ${createdAlbums.length} álbumes y ${totalSongs} canciones`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
};

seedDB();
