export const REGEX_EMAIL_VALIDATION = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const REGEX_PASSWORD_VALIDATION =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const DEFAULT_SALT = 10;
