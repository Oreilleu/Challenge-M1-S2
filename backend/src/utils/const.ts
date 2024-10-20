export const REGEX_EMAIL_VALIDATION = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const REGEX_PASSWORD_VALIDATION =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const DEFAULT_SALT = 10;
export const REGEX_PHONE_VALIDATION =
  /^(\+?\d{1,3})?[-. ]?(\(?\d{1,4}\)?)?[-. ]?(\d{1,4}[-. ]?){1,4}\d{1,4}$(?=.{0,17}$)/;
