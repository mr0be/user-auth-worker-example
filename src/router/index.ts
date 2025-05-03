import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', name: 'home', component: MainView },
  { path: '/login', name: 'login', component: LoginView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const res = await fetch('/api/session', { credentials: 'include' })

  const isAuthenticated = res.ok

  if (to.path !== '/login' && !isAuthenticated) {
    return next('/login')
  }

  if(to.path === '/login' && isAuthenticated){
    return next("/")
  }
  next()
})

export default router
