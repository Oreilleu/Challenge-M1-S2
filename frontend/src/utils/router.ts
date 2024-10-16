import AccountUnvalidated from '@/views/AccountUnvalidated.vue'
import HomePage from '@/views/HomePage.vue'
import LoginView from '@/views/Login.vue'
import RegisterView from '@/views/RegisterView.vue'
import VerifyAccount from '@/views/VerifyAccount.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import localStorageHandler from './localStorageHandler'
import { LocalStorageKeys } from './types'
import { isAuthenticated } from './isAuthenticatedUser'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/verify-account',
    name: 'VerifyAccount',
    component: VerifyAccount
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: ResetPasswordView
  },
  {
    path: '/account-unvalidated',
    name: 'AccountUnvalidated',
    component: AccountUnvalidated
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const user = localStorageHandler().get(LocalStorageKeys.USER)
  const isAuthenticatedUser = await isAuthenticated()

  const isUserVerified = user && user.isVerified

  const isUserNotVerified = user && !user.isVerified

  const authenticatedPages = ['AccountUnvalidated', 'VerifyAccount']

  if ((to.name === 'Login' || to.name === 'Register') && isAuthenticatedUser) {
    next({ name: 'Home' })
  } else if (to.name !== 'AccountUnvalidated' && to.name !== 'VerifyAccount' && isUserNotVerified) {
    next({ name: 'AccountUnvalidated' })
  } else if ((to.name === 'AccountUnvalidated' || to.name === 'VerifyAccount') && isUserVerified) {
    next({ name: 'Home' })
  } else if (authenticatedPages.includes((to?.name as string) || '') && !isAuthenticatedUser) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
