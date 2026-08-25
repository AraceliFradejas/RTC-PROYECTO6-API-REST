const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('Falta la variable de entorno MONGO_URI');
  }

  const conn = await mongoose.connect(mongoUri);
  cachedConnection = conn;
  console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  return conn;
};

module.exports = connectDB;
