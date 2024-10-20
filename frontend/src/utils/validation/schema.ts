import { z } from 'zod'
import {
  civilityValidation,
  confirmPasswordValidation,
  emailValidation,
  firstnameValidation,
  lastnameValidation,
  passwordValidation,
  phoneValidation
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

// export const resetPasswordFormSchema = z
//   .object({
//     password: passwordValidation,
//     confirmPassword: confirmPasswordValidation
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: 'Les mots de passe ne correspondent pas',
//     path: ['confirmPassword']
//   })
