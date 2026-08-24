const Song = require('../models/Song');
const Album = require('../models/Album');

// @desc    Obtener todas las canciones
// @route   GET /api/songs
const getAllSongs = async (req, res, next) => {
  try {
    const { title, author, year } = req.query;
    const filter = {};

    if (title) filter.title = { $regex: title, $options: 'i' };
    if (author) filter.author = { $regex: author, $options: 'i' };
    if (year) filter.year = Number(year);

    const songs = await Song.find(filter).populate('album', 'title year era eraColor coverImage');
    res.status(200).json({ success: true, count: songs.length, data: songs });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener una canción por ID
// @route   GET /api/songs/:id
const getSongById = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id).populate('album', 'title year era eraColor coverImage');
    if (!song) {
      return res.status(404).json({ success: false, error: 'Canción no encontrada' });
    }
    res.status(200).json({ success: true, data: song });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear una canción nueva
// @route   POST /api/songs
const createSong = async (req, res, next) => {
  try {
    const song = await Song.create(req.body);

    // ✅ Añadir la canción al array del álbum usando $addToSet (evita duplicados)
    await Album.findByIdAndUpdate(
      song.album,
      { $addToSet: { songs: song._id } },
      { new: true }
    );

    res.status(201).json({ success: true, data: song });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar una canción
// @route   PUT /api/songs/:id
const updateSong = async (req, res, next) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!song) {
      return res.status(404).json({ success: false, error: 'Canción no encontrada' });
    }
    res.status(200).json({ success: true, data: song });
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar una canción
// @route   DELETE /api/songs/:id
const deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ success: false, error: 'Canción no encontrada' });
    }

    // Quitar la referencia del álbum
    await Album.findByIdAndUpdate(song.album, { $pull: { songs: song._id } });
    await song.deleteOne();

    res.status(200).json({ success: true, message: 'Canción eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllSongs, getSongById, createSong, updateSong, deleteSong };
