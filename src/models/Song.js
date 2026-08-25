const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título de la canción es obligatorio'],
      trim: true
    },
    author: {
      type: String,
      required: [true, 'El autor es obligatorio'],
      trim: true,
      default: 'Taylor Swift'
    },
    duration: {
      type: String,
      trim: true
    },
    trackNumber: {
      type: Number,
      min: 1
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
      required: [true, 'La canción debe pertenecer a un álbum']
    },
    isPopular: {
      type: Boolean,
      default: false
    },
    lyrics: {
      type: String,
      trim: true
    },
    year: {
      type: Number
    },
    spotifyUrl: {
      type: String,
      trim: true,
      default: ''
    },
    appleMusicUrl: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Índice para búsquedas por título
songSchema.index({ title: 'text', author: 'text' });

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
