const express = require('express');
const router = express.Router();
const {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong
} = require('../controllers/songController');

// GET /api/songs          → todas las canciones (acepta ?title=, ?author=, ?year=)
// POST /api/songs         → crear canción
router.route('/').get(getAllSongs).post(createSong);

// GET /api/songs/:id      → canción por ID
// PUT /api/songs/:id      → actualizar canción
// DELETE /api/songs/:id   → eliminar canción
router.route('/:id').get(getSongById).put(updateSong).delete(deleteSong);

module.exports = router;
