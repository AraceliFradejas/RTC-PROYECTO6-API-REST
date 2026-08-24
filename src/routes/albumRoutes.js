const express = require('express');
const router = express.Router();
const {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  addSongToAlbum,
  removeSongFromAlbum
} = require('../controllers/albumController');

// GET /api/albums         → todos los álbumes (acepta ?title=, ?year=, ?era=)
// POST /api/albums        → crear álbum
router.route('/').get(getAllAlbums).post(createAlbum);

// GET /api/albums/:id     → álbum por ID
// PUT /api/albums/:id     → actualizar álbum (sin borrar songs)
// DELETE /api/albums/:id  → eliminar álbum y sus canciones
router.route('/:id').get(getAlbumById).put(updateAlbum).delete(deleteAlbum);

// POST /api/albums/:id/songs/:songId   → añadir canción al álbum (sin duplicados)
// DELETE /api/albums/:id/songs/:songId → quitar canción del álbum
router.route('/:id/songs/:songId').post(addSongToAlbum).delete(removeSongFromAlbum);

module.exports = router;
