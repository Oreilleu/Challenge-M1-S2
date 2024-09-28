const error = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Un utilisateur avec cet email existe déja.",
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Une erreur est survenue sur le serveur.",
  });
};

module.exports = error;
