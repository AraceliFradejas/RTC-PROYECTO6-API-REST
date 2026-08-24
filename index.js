require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Importar rutas
const albumRoutes = require('./src/routes/albumRoutes');
const songRoutes = require('./src/routes/songRoutes');

// Conectar a la base de datos
connectDB();

const app = express();

// ── Middlewares ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Servir archivos estáticos del frontend ───────────────────
app.use(express.static(path.join(__dirname, 'frontend')));

// ── Rutas API ─────────────────────────────────────────────────
app.use('/api/albums', albumRoutes);
app.use('/api/songs', songRoutes);

// ── Ruta de estado de la API ──────────────────────────────────
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: '🎵 Taylor Swift Discography API REST',
    version: '1.0.0',
    author: 'Araceli Fradejas',
    endpoints: {
      albums: '/api/albums',
      songs: '/api/songs'
    }
  });
});

// ── Fallback: devolver index.html para rutas del frontend ─────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ── Manejador de errores global ───────────────────────────────
app.use(errorHandler);

// ── Iniciar servidor ──────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📖 API disponible en http://localhost:${PORT}/api`);
});

module.exports = app;
