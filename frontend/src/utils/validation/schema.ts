import { z } from 'zod'
import {
  civilityValidation,
  emailValidation,
  firstnameValidation,
  lastnameValidation,
  passwordValidation,
  confirmPasswordValidation
} from './validation'

export const registerFormSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
  firstname: firstnameValidation,
  lastname: lastnameValidation,
  civility: civilityValidation
})

export const loginFormSchema = z.object({
  email: emailValidation,
  password: passwordValidation
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
