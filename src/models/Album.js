const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título del álbum es obligatorio'],
      unique: true,
      trim: true
    },
    year: {
      type: Number,
      required: [true, 'El año de publicación es obligatorio']
    },
    coverImage: {
      type: String,
      trim: true,
      default: ''
    },
    description: {
      type: String,
      trim: true
    },
    era: {
      type: String,
      trim: true
    },
    eraColor: {
      type: String,
      trim: true,
      default: '#d4a0c8'
    },
    totalTracks: {
      type: Number,
      default: 0
    },
    // ✅ RELACIÓN: Array de ObjectIds que referencian la colección Song
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
      }
    ],
    label: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Índice para búsquedas por título
albumSchema.index({ title: 'text' });

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
