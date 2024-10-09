export type RegisterForm = {
  email: string
  password: string
  civility: Civility
  firstname: string
  lastname: string
}

type Civility = 'man' | 'woman'
