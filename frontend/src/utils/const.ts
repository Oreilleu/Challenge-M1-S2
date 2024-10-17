export const REGEX_PASSWORD_VALIDATION =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const REGEX_PHONE_VALIDATION =
  /^(\+?\d{1,3})?[-. ]?(\(?\d{1,4}\)?)?[-. ]?(\d{1,4}[-. ]?){1,4}\d{1,4}$(?=.{0,17}$)/
