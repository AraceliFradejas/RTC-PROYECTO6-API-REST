const Album = require('../models/Album');
const Song = require('../models/Song');

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
      .populate('songs', 'title author duration trackNumber isPopular')
      .sort({ year: 1 });

    res.status(200).json({ success: true, count: albums.length, data: albums });
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
      'title author duration trackNumber isPopular lyrics year'
    );
    if (!album) {
      return res.status(404).json({ success: false, error: 'Álbum no encontrado' });
    }
    res.status(200).json({ success: true, data: album });
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
