const REGEX_EMAIL_VALIDATION = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const REGEX_PASSWORD_VALIDATION =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const DEFAULT_SALT = 10;

module.exports = {
  REGEX_EMAIL_VALIDATION,
  REGEX_PASSWORD_VALIDATION,
  DEFAULT_SALT,
};
