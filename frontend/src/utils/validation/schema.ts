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
  imagesValidation,
  variationPriceValidation,
  variationQuantiteValidation,
  categoryNameValidation,
  categoryDescriptionValidation,
  categoryParentValidation,
  streetValidation,
  cityValidation,
  postalCodeValidation,
  countryValidation,
  suffixValidation,
  orderStatusValidation
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
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirmPassword']
  })

export const variationSchema = z.object({
  suffix: suffixValidation,
  images: imagesValidation.optional(),
  price: variationPriceValidation,
  quantite: variationQuantiteValidation,
  filters: z
    .array(
      z.object({
        name: filterNameValidation,
        value: filterValueValidation
      })
    )
    .min(1, { message: 'Il faut au moins un filtre.' })
})

export const productSchema = z.object({
  name: nameProductValidation,
  description: descriptionProductValidation,
  brand: brandProductValidation,
  model: modelProductValidation,
  idCategory: z
    .string({ required_error: 'Il faut une catégorie.' })
    .min(1, { message: 'Il faut une catégorie.' }),
  variations: z.array(variationSchema).min(1, { message: 'Il faut au moins une variation.' })
})

export const categorySchema = z.object({
  name: categoryNameValidation,
  description: categoryDescriptionValidation,
  image: imagesValidation.optional(),
  parent: categoryParentValidation
})

export const deliveryAddressSchema = z.object({
  street: streetValidation,
  city: cityValidation,
  postalCode: postalCodeValidation,
  country: countryValidation
})

export const updateUserSchema = z.object({
  email: emailValidation,
  firstname: firstnameValidation,
  lastname: lastnameValidation,
  civility: civilityValidation,
  phone: phoneValidation
})

export const orderSchema = z.object({
  status: orderStatusValidation
})

