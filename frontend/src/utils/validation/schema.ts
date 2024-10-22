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
import type { RegisterForm } from '../types'

export const registerFormSchema = (data: RegisterForm) => {
  return z.object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation(data.password),
    firstname: firstnameValidation,
    lastname: lastnameValidation,
    civility: civilityValidation,
    phone: phoneValidation
  })
}

export const loginFormSchema = z.object({
  email: emailValidation,
  password: z.string()
})

export const forgotPasswordFormSchema = z.object({
  email: emailValidation
})

export const resetPasswordFormSchema = (data: { password: string; confirmPassword: string }) => {
  return z.object({
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation(data.password)
  })
}

export const createProductSchema = z.object({
  name: nameProductValidation,
  description: descriptionProductValidation,
  brand: brandProductValidation,
  model: modelProductValidation,
  category: z.string().optional(),
  variation: z
    .array(
      z.object({
        images: variationImagesValidation,
        price: variationPriceValidation,
        quantite: variationQuantiteValidation,
        filter: z.object({
          name: filterNameValidation,
          value: filterValueValidation
        })
      })
    )
    .min(1, { message: 'Au moins  une variation est requise.' })
})
