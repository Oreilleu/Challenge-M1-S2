import { z } from 'zod'
import {
  civilityValidation,
  emailValidation,
  firstnameValidation,
  lastnameValidation,
  passwordValidation
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
