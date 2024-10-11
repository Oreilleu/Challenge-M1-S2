const error = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Une erreur est survenue sur le serveur.",
  });
};

module.exports = error;
