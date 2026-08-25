const Album = require('../models/Album');
const Song = require('../models/Song');

const coverCache = new Map();

const normalizeText = (text = '') =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const resolveAlbumCover = async (album) => {
  if (!album || !album.title) return album;

  const hasGeneratedCover = typeof album.coverImage === 'string' && album.coverImage.startsWith('data:image/svg+xml');
  if (!hasGeneratedCover) return album;

  if (coverCache.has(album.title)) {
    return { ...album, coverImage: coverCache.get(album.title) };
  }

  try {
    const query = encodeURIComponent(`Taylor Swift ${album.title}`);
    const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=album&limit=10`);
    const data = await response.json();
    const results = Array.isArray(data.results) ? data.results : [];

    const wanted = normalizeText(album.title);
    const bestMatch =
      results.find((item) => normalizeText(item.collectionName || '') === wanted) ||
      results.find((item) => normalizeText(item.collectionName || '').includes(wanted)) ||
      results[0];

    if (bestMatch && bestMatch.artworkUrl100) {
      const realCover = bestMatch.artworkUrl100.replace('100x100bb', '1200x1200bb');
      coverCache.set(album.title, realCover);
      return { ...album, coverImage: realCover };
    }
  } catch (error) {
    // Si falla iTunes, devolvemos la portada existente para no romper la API.
  }

  return album;
};

// @desc    Obtener todos los álbumes
// @route   GET /api/albums
const getAllAlbums = async (req, res, next) => {
  try {
    const { title, year, era } = req.query;
    const filter = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (year) filter.year = Number(year);
    if (era) filter.era = { $regex: era, $options: 'i' };

    const albums = await Album.find(filter)
      .populate('songs', 'title author duration trackNumber isPopular spotifyUrl appleMusicUrl')
      .sort({ year: 1 });

    const albumsWithCovers = await Promise.all(albums.map((album) => resolveAlbumCover(album.toObject())));

    res.status(200).json({ success: true, count: albumsWithCovers.length, data: albumsWithCovers });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener un álbum por ID
// @route   GET /api/albums/:id
const getAlbumById = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate(
      'songs',
      'title author duration trackNumber isPopular lyrics year spotifyUrl appleMusicUrl'
    );
    if (!album) {
      return res.status(404).json({ success: false, error: 'Álbum no encontrado' });
    }

    const albumWithCover = await resolveAlbumCover(album.toObject());

    res.status(200).json({ success: true, data: albumWithCover });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear un álbum
// @route   POST /api/albums
const createAlbum = async (req, res, next) => {
  try {
    const album = await Album.create(req.body);
    res.status(201).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar un álbum
// @route   PUT /api/albums/:id
// ✅ IMPORTANTE: No se toca el array "songs" en el body para no borrar las canciones
const updateAlbum = async (req, res, next) => {
  try {
    // Excluimos el campo "songs" del body para no machacar el array de canciones
    const { songs, ...updateData } = req.body;

    const album = await Album.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    }).populate('songs', 'title author duration trackNumber isPopular');

    if (!album) {
      return res.status(404).json({ success: false, error: 'Álbum no encontrado' });
    }
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar un álbum
// @route   DELETE /api/albums/:id
const deleteAlbum = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ success: false, error: 'Álbum no encontrado' });
    }

    // Eliminar también las canciones del álbum
    await Song.deleteMany({ album: album._id });
    await album.deleteOne();

    res.status(200).json({ success: true, message: 'Álbum y sus canciones eliminados correctamente' });
  } catch (error) {
    next(error);
  }
};

// @desc    Añadir canción al array del álbum (evita duplicados con $addToSet)
// @route   POST /api/albums/:id/songs/:songId
const addSongToAlbum = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.songId);
    if (!song) {
      return res.status(404).json({ success: false, error: 'Canción no encontrada' });
    }

    if (song.album.toString() !== req.params.id) {
      return res.status(400).json({
        success: false,
        error: 'La canción pertenece a otro álbum. Actualiza primero la canción.'
      });
    }

    const album = await Album.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { songs: req.params.songId } },
      { new: true }
    ).populate('songs', 'title author duration trackNumber isPopular');

    if (!album) {
      return res.status(404).json({ success: false, error: 'Álbum no encontrado' });
    }
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

// @desc    Quitar canción del array del álbum
// @route   DELETE /api/albums/:id/songs/:songId
const removeSongFromAlbum = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.songId);
    if (song && song.album.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        error: 'No se puede quitar la relación mientras la canción pertenezca al álbum'
      });
    }

    const album = await Album.findByIdAndUpdate(
      req.params.id,
      { $pull: { songs: req.params.songId } },
      { new: true }
    ).populate('songs', 'title author duration trackNumber isPopular');

    if (!album) {
      return res.status(404).json({ success: false, error: 'Álbum no encontrado' });
    }
    res.status(200).json({ success: true, data: album });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  addSongToAlbum,
  removeSongFromAlbum
};
