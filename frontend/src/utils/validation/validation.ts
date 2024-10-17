import { z } from 'zod'
import { REGEX_PASSWORD_VALIDATION, REGEX_PHONE_VALIDATION } from '../const'

export const emailValidation = z
  .string()
  .email({ message: "L'email doit être sous la forme : nom@domain.com" })
export const passwordValidation = z.string().regex(REGEX_PASSWORD_VALIDATION, {
  message:
    'Le mot de passe doit contenir au moins un caractère spécial, une majuscule, une minuscule et un chiffre !'
})
export const confirmPasswordValidation = (password: string) => {
  return z
    .string()
    .min(1, 'La confirmation du mot de passe est obligatoire')
    .refine((confirmPassword) => confirmPassword === password, {
      message: 'Les mots de passe ne correspondent pas'
    })
}
export const firstnameValidation = z
  .string()
  .min(2, { message: 'Le prénom doit avoir au moins deux caractères.' })
  .max(250, { message: 'Le prénom doit avoir maximun 250 caractères' })
export const lastnameValidation = z
  .string()
  .min(2, { message: 'Le nom de famille doit avoir au moins deux caractères.' })
  .max(250, { message: 'Le nom de famille doit avoir maximun 250 caractères' })
export const civilityValidation = z.enum(['man', 'woman'])
export const phoneValidation = z.string().regex(REGEX_PHONE_VALIDATION, {
  message:
    'Le numéro de téléphone doit respecter le standard, exemple : 06 00 00 00 00 OU +33 6 00 00 00 00'
})
