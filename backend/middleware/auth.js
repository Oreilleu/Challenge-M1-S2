const { verifyJsonWebToken } = require("../utils/jsonWebtoken");

module.exports = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Accès refusé. Aucun token fourni.",
    });
  }

  try {
    const decoded = verifyJsonWebToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("Erreur de vérification du token", err);
    return res.status(401).json({
      success: false,
      message: "Token invalide ou expiré.",
    });
  }
};
