import { z } from 'zod'
import {
  brandProductValidation,
  civilityValidation,
  confirmPasswordValidation,
  descriptionProductValidation,
  emailValidation,
  filterNameValidation,
  filterValueValidation,
  firstnameValidation,
  lastnameValidation,
  modelProductValidation,
  nameProductValidation,
  passwordValidation,
  phoneValidation,
  variationImagesValidation,
  variationPriceValidation,
  variationQuantiteValidation
} from './validation'

export const registerFormSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
    firstname: firstnameValidation,
    lastname: lastnameValidation,
    civility: civilityValidation,
    phone: phoneValidation
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
  })

export const loginFormSchema = z.object({
  email: emailValidation,
  password: z.string()
})

export const forgotPasswordFormSchema = z.object({
  email: emailValidation
})

export const resetPasswordFormSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
  })

export const variationSchema = z.object({
  images: variationImagesValidation.optional(),
  price: variationPriceValidation,
  quantite: variationQuantiteValidation,
  filters: z
    .array(
      z.object({
        name: filterNameValidation,
        value: filterValueValidation
      })
    )
    .min(1, { message: 'Il faut au moins un filtre' })
})

export const productschema = z.object({
  name: nameProductValidation,
  description: descriptionProductValidation,
  brand: brandProductValidation,
  model: modelProductValidation,
  category: z.string().optional(),
  variations: z.array(variationSchema).min(1, { message: 'Il faut au moins une variation' })
})

export const updateProductschema = z.object({
  name: nameProductValidation,
  description: descriptionProductValidation,
  brand: brandProductValidation,
  model: modelProductValidation,
  category: z.string().optional(),
  variations: z.array(variationSchema).min(1, { message: 'Il faut au moins une variation' })
})
