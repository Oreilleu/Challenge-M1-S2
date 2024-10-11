const jwt = require("jsonwebtoken");

const generateJsonWebToken = async (data, expiresIn) => {
  return jwt.sign(data, process.env.JWT_TOKEN, { expiresIn });
};

const verifyJsonWebToken = async (token) => {
  return jwt.verify(token, process.env.JWT_TOKEN);
};

module.exports = { generateJsonWebToken, verifyJsonWebToken };
