import { z } from 'zod'
import { REGEX_PASSWORD_VALIDATION } from '../const'

export const emailValidation = z
  .string()
  .email({ message: "L'email doit être sous la forme : nom@domain.com" })
export const passwordValidation = z.string().regex(REGEX_PASSWORD_VALIDATION, {
  message:
    'Le mot de passe doit contenir au moins un caractère spécial, une majuscule, une minuscule et un chiffre !'
})
export const firstnameValidation = z
  .string()
  .min(2, { message: 'Le prénom doit avoir au moins deux caractères.' })
  .max(250, { message: 'Le prénom doit avoir maximun 250 caractères' })
export const lastnameValidation = z
  .string()
  .min(2, { message: 'Le nom de famille doit avoir au moins deux caractères.' })
  .max(250, { message: 'Le nom de famille doit avoir maximun 250 caractères' })
export const civilityValidation = z.enum(['man', 'woman'])
