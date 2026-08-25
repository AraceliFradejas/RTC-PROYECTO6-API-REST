const mongoose = require('mongoose');

let cachedConnection = null;

const normalizeMongoUri = (rawValue = '') => {
  let value = String(rawValue || '').trim();

  // Maneja el caso típico de pegar "MONGO_URI=..." en el campo Value de Vercel.
  if (value.startsWith('MONGO_URI=')) {
    value = value.slice('MONGO_URI='.length).trim();
  }

  // Elimina comillas pegadas por copia/pega.
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1).trim();
  }

  return value;
};

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = normalizeMongoUri(process.env.MONGO_URI);
  if (!mongoUri) {
    throw new Error('Falta la variable de entorno MONGO_URI');
  }

  const conn = await mongoose.connect(mongoUri);
  cachedConnection = conn;
  console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  return conn;
};

module.exports = connectDB;
