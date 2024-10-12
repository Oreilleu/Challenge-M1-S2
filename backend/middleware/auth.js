const { verifyJsonWebToken } = require("../utils/jsonWebtoken");

const checkToken = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Accès refusé. Aucun token fourni.",
    });
  }

  try {
    const decoded = await verifyJsonWebToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Token invalide ou expiré.",
    });
  }
};

module.exports = checkToken;
