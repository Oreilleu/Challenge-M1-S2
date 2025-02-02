import AccountUnvalidated from '@/views/AccountUnvalidated.vue'
import VerifyAccount from '@/views/VerifyAccount.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from './isAuthenticatedUser'
import AdminProducts from '@/views/backOffice/AdminProducts.vue'
import AdminUsers from '@/views/backOffice/AdminUsers.vue'

import ProductsByCategory from '@/views/ProductsByCategory.vue'
import { fetchIsAdminUser, fetchIsVerifiedUser } from './api/user'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import Product from '@/views/Product.vue'
import AdminCategories from '@/views/backOffice/AdminCategories.vue'
import WhoWeAre from '@/views/WhoWeAre.vue'
import TermsOfService from '@/views/TermsOfService.vue'
// @ts-ignore
import FAQ from '@/views/FAQ.vue'
import Cart from '@/views/Cart.vue'
import AdminOrders from '@/views/backOffice/AdminOrders.vue'
// @ts-ignore
import MyAccount from '@/views/MyAccount.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import ConditionSale from '@/views/ConditionSale.vue'
import ConditionUsers from '@/views/ConditionUsers.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import DataRegister from '@/views/DataRegister.vue'
import DataUsers from '@/views/DataUsers.vue'
import PlanSite from '@/views/PlanSite.vue'
import Store from '@/views/Store.vue'
import AdminDashboard from '@/views/backOffice/AdminDashboard.vue'

const redirectToHomeIfUserAuthenticated = async () => {
  const isAuthenticatedUser = await isAuthenticated()
  if (isAuthenticatedUser) {
    return { name: 'Product' }
  }
}

const redirectToHomeIfUserVerified = async () => {
  const isVerifiedUser = await fetchIsVerifiedUser()

  if (isVerifiedUser.data) {
    return { name: 'Product' }
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

  if (!isAdminUser) {
    return { name: 'Product' }
  }
}

const routes = [
  {
    path: '/',
    name: 'Product',
    component: Product
  },
  {
    path: '/qui-sommes-nous',
    name: 'WhoWeAre',
    component: WhoWeAre
  },
  {
    path: '/cgv',
    name: 'TermsOfService',
    component: TermsOfService
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ
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
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    beforeEnter: redirectToLoginIfUserUnauthenticated
  },
  {
    path: '/category/:id',
    name: 'ProductByCategory',
    component: ProductsByCategory
  },
  {
    path: '/product-details/:productId',
    name: 'ProductDetails',
    component: ProductDetails
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
    path: '/admin/orders',
    name: 'AdminOrders',
    component: AdminOrders,
    beforeEnter: isAdminPage
  },
  /*{
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    beforeEnter: isAdminPage
  },*/
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    beforeEnter: isAdminPage
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    beforeEnter: isAdminPage
  },

  // routes footer
  {
    path: '/condition-sale', //CGV
    name: 'ConditionSale',
    component: ConditionSale
  },
  {
    path: '/condition-users', // CGU
    name: 'ConditionUsers',
    component: ConditionUsers
  },
  {
    path: '/data-register',
    name: 'DataRegister',
    component: DataRegister
  },
  {
    path: '/data-users',
    name: 'DataUsers',
    component: DataUsers
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/plan-site',
    name: 'PlanSite',
    component: PlanSite
  },
  {
    path: '/store',
    name: 'Store',
    component: Store
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
