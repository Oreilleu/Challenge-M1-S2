import { z } from 'zod'
import {
  AVAILABLE_FILE_IMAGE_TYPES,
  REGEX_PASSWORD_VALIDATION,
  REGEX_PHONE_VALIDATION
} from '../const'

export const emailValidation = z
  .string()
  .min(1, { message: "L'email est obligatoire." })
  .email({ message: "L'email doit être sous la forme : nom@domain.com" })

export const passwordValidation = z.string().regex(REGEX_PASSWORD_VALIDATION, {
  message:
    'Le mot de passe doit contenir au moins un caractère spécial, une majuscule, une minuscule et un chiffre !'
})

export const confirmPasswordValidation = z.string().min(1, {
  message: 'La confirmation du mot de passe est obligatoire'
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
  .min(2, { message: 'La description du produit doit avoir au moins 120 caractères.' })
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

export const imagesValidation = z.object({
  files: z
    .instanceof(FileList, { message: 'Ne doit pas être vide' })
    .refine(
      (files) => {
        return Array.from(files).every((file) => AVAILABLE_FILE_IMAGE_TYPES.includes(file.type))
      },
      {
        message: 'Le fichier doit être de type png, jpg ou jpeg'
      }
    )
    .refine((files) => files.length > 0, {
      message: 'Le fichier est requis'
    })
    .refine((files) => files.length <= 5, {
      message: 'Vous ne pouvez pas ajouter plus de 5 images'
    })
})

export const suffixValidation = z.string().min(1, { message: 'Le suffixe est requis' })

export const variationPriceValidation = z
  .number({ message: 'Le prix est requis' })
  .min(1, { message: 'Le prix doit être supérieur à 1 euros' })
  .max(100000, { message: 'Le prix doit être inférieur à 100 000 €' })

export const variationQuantiteValidation = z
  .number({ message: 'La quantité est requise' })
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

// Category

export const categoryNameValidation = z
  .string()
  .min(2, { message: 'Le nom de la catégorie doit avoir au moins deux caractères.' })
  .max(50, { message: 'Le nom de la catégorie doit avoir maximun 50 caractères' })

export const categoryDescriptionValidation = z
  .string()
  .min(2, { message: 'La description de la catégorie doit avoir au moins deux caractères.' })
  .max(500, { message: 'La description de la catégorie doit avoir maximun 500 caractères' })
  .optional()
  .or(z.literal(''))

export const categoryParentValidation = z.string().optional()

export const streetValidation = z
  .string({ required_error: 'La rue est obligatoire.' })
  .min(1, { message: 'La rue est obligatoire' })
  .max(250, { message: 'La rue doit avoir maximun 250 caractères' })

export const cityValidation = z
  .string({ required_error: 'La ville est obligatoire.' })
  .min(1, { message: 'La ville est obligatoire' })
  .max(250, { message: 'La ville doit avoir maximun 250 caractères' })

export const postalCodeValidation = z
  .string({ required_error: 'Le code postal est obligatoire.' })
  .regex(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/, {
    message: 'Le code postal doit être sous la forme : 75001'
  })

export const countryValidation = z
  .string({ required_error: 'Le pays est obligatoire.' })
  .min(1, { message: 'Le pays est obligatoire' })
  .max(250, { message: 'Le pays doit avoir maximun 250 caractères' })
