const { verifyJsonWebToken } = require("../utils/jsonWebtoken");

const auth = (req, res, next) => {
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
    return res.status(401).json({
      success: false,
      message: "Token invalide ou expiré.",
    });
  }
};

module.exports = auth;
