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

export const nameProductValidation = z
  .string()
  .min(2, { message: 'Le nom du produit doit avoir au moins deux caractères.' })
  .max(250, { message: 'Le nom du produit doit avoir maximun 250 caractères' })

export const descriptionProductValidation = z
  .string()
  .min(120, { message: 'La description du produit doit avoir au moins 120 caractères.' })
  .max(500, { message: 'La description du produit doit avoir maximun 500 caractères' })

export const brandProductValidation = z
  .string()
  .min(2, { message: 'La marque du produit doit avoir au moins deux caractères.' })
  .max(100, { message: 'La marque du produit doit avoir maximun 100 caractères' })

export const modelProductValidation = z
  .string()
  .min(2, { message: 'Le modèle du produit doit avoir au moins deux caractères.' })
  .max(50, { message: 'Le modèle du produit doit avoir maximun 100 caractères' })

export const variationValidation = z
  .array(z.object({}))
  .min(1, { message: 'Il faut au moins une variation' })

// export const variationImagesValidation = z
//   .array(z.string())
//   .min(1, { message: 'Il faut au moins une image' })

export const variationImagesValidation = z.string().min(1, {
  message: 'Il faut au moins une image'
})

export const variationPriceValidation = z
  .number()
  .min(1, { message: 'Le prix doit être supérieur à 1 euros' })
  .max(100000, { message: 'Le prix doit être inférieur à 100 000 €' })

export const variationQuantiteValidation = z
  .number()
  .min(1, { message: 'La quantité est requise' })
  .max(1000, { message: 'La quantité doit être inférieur à 1000' })

export const filterNameValidation = z
  .string()
  .min(2, { message: 'Le nom du filtre doit avoir au moins deux caractères.' })
  .max(50, { message: 'Le nom du filtre doit avoir maximun 50 caractères' })

export const filterValueValidation = z
  .string()
  .min(2, { message: 'La valeur du filtre doit avoir au moins deux caractères.' })
  .max(50, { message: 'La valeur du filtre doit avoir maximun 50 caractères' })
