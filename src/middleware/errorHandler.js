/**
 * Middleware de manejo de errores global
 */
const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  // Error de cast (ID inválido de MongoDB)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'ID de recurso no válido'
    });
  }

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: messages.join(', ')
    });
  }

  // Error de clave duplicada
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      error: `Ya existe un registro con ese valor en el campo "${field}"`
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor'
  });
};

module.exports = errorHandler;
