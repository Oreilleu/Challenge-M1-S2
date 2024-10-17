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
