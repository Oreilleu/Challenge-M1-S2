import HomePage from '@/views/HomePage.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import VerifyAccount from '@/views/VerifyAccount.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
