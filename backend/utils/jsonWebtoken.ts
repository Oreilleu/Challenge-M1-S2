export const jwt = require("jsonwebtoken");

// TODO : pas de any sur data
// TODO : enum pour expiredIn
export const generateJsonWebToken = async (data: any, expiresIn: string) => {
  return jwt.sign(data, process.env.JWT_TOKEN, { expiresIn });
};

export const verifyJsonWebToken = async (token: string) => {
  return jwt.verify(token, process.env.JWT_TOKEN);
};
