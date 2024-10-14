import AccountUnvalidated from '@/views/AccountUnvalidated.vue'
import HomePage from '@/views/HomePage.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import VerifyAccount from '@/views/VerifyAccount.vue'
import { createRouter, createWebHistory } from 'vue-router'
import localStorageHandler from './localStorageHandler'
import { LocalStorageKeys } from './types'

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
    path: '/account-unvalidated',
    name: 'AccountUnvalidated',
    component: AccountUnvalidated
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// const verifyToken = () => {

// }

const isAuthenticated = () => {
  // ATTENTION : vérifier l'intégrité du token
  // Si pas de token, supprimer le user du local storage
  return localStorageHandler().get(LocalStorageKeys.AUTH_TOKEN) !== null
}

// ATTENTION : Un utilisateur non authentifié a quand même accès à la quasi totalité du site
router.beforeEach((to, from, next) => {
  const user = localStorageHandler().get(LocalStorageKeys.USER)
  if (to.name !== 'Login' && to.name !== 'Register' && !isAuthenticated()) {
    next({ name: 'Login' })
  } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated()) {
    next({ name: 'Home' })
  } else if (to.name === 'Home' && !user.isVerified) {
    next({ name: 'AccountUnvalidated' })
  } else if ((to.name === 'AccountUnvalidated' || to.name === 'VerifyAccount') && user.isVerified) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
