import AccountUnvalidated from '@/views/AccountUnvalidated.vue'
import VerifyAccount from '@/views/VerifyAccount.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from './isAuthenticatedUser'
import AdminProducts from '@/views/backOffice/product/AdminProducts.vue'
import AdminUsers from '@/views/AdminUsers.vue'
import { fetchIsAdminUser, fetchIsVerifiedUser } from './api/user'
import Register from '@/views/Register.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import Product from '@/views/Product.vue'
import AdminCategories from '@/views/backOffice/category/AdminCategories.vue'

const redirectToHomeIfUserAuthenticated = async () => {
  const isAuthenticatedUser = await isAuthenticated()
  if (isAuthenticatedUser) {
    return { name: 'Home' }
  }
}

const redirectToHomeIfUserVerified = async () => {
  const isVerifiedUser = await fetchIsVerifiedUser()

  if (isVerifiedUser.data) {
    return { name: 'Home' }
  }
}

const redirectToLoginIfUserUnauthenticated = async () => {
  const isAuthenticatedUser = await isAuthenticated()

  if (!isAuthenticatedUser) {
    return { name: 'Login' }
  }
}

const isAdminPage = async () => {
  const isAdminUser = await fetchIsAdminUser()

  if (!isAdminUser.data) {
    return { name: 'Home' }
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: redirectToHomeIfUserAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: redirectToHomeIfUserAuthenticated
  },
  {
    path: '/verify-account',
    name: 'VerifyAccount',
    component: VerifyAccount,
    beforeEnter: [redirectToLoginIfUserUnauthenticated, redirectToHomeIfUserVerified]
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/account-unvalidated',
    name: 'AccountUnvalidated',
    component: AccountUnvalidated,
    beforeEnter: [redirectToLoginIfUserUnauthenticated, redirectToHomeIfUserVerified]
  },

  //backoffice routes prefix /admin
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts,
    beforeEnter: isAdminPage
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: AdminCategories,
    beforeEnter: isAdminPage
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    beforeEnter: isAdminPage
  },
  {
    path: '/products',
    name: 'Product',
    component: Product
  },
  {
    path: '/admin/categories',
    name: 'AdminCategories',
    component: AdminCategories,
    beforeEnter: isAdminPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const isUserAuthenticated = await isAuthenticated()
  const isUserVerified = await fetchIsVerifiedUser()

  const isUserAuthenticatedAndNotVerified = isUserAuthenticated && !isUserVerified.data

  const onValidateAccountPages = ['AccountUnvalidated', 'VerifyAccount'].includes(to.name as string)

  if (!onValidateAccountPages && isUserAuthenticatedAndNotVerified) {
    next({ name: 'AccountUnvalidated' })
  } else {
    next()
  }
})

export default router
