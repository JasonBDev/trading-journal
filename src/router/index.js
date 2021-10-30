import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Social from '../views/Social.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Statistics from '../views/Statistics.vue'
import Accounts from '../views/Accounts.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/social',
    name: 'Social',
    component: Social,
    
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,

  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: Accounts
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
