const jwt = require("jsonwebtoken");

const generateJsonWebToken = async (data) => {
  return jwt.sign(data, process.env.JWT_TOKEN, { expiresIn: "24h" });
};

const verifyJsonWebToken = async (token) => {
  return jwt.verify(token, process.env.JWT_TOKEN);
};

module.exports = { generateJsonWebToken, verifyJsonWebToken };
