import Vue from 'vue'
import Router from 'vue-router'
const _import = view => () => import('@/views/' + view)

Vue.use(Router)

export const createRouter = (routes = []) => (
  new Router({
    routes
  })
)

export const authRouterMap = [{
  path: '/login',
  name: 'Login',
  meta: { layout: 'noMenu' },
  component: _import('Login'),
  hidden: true
}]

export const constRouterMap = [
  {
    path: '/',
    name: 'Dashboard',
    meta: { title: 'Панель управления', icon: 'tachometer-alt' },
    component: _import('Dashboard')
  }
]

export const asyncRouterMap = [
  {
    path: '/excursion',
    name: 'Excursion',
    meta: { title: 'Экскурсии', icon: 'user' },
    component: _import('Excursion')
  },
  {
    path: '/tours',
    name: 'Tours',
    meta: { title: 'Туры', icon: 'suitcase-rolling' },
    component: _import('Tours')
  },
  {
    path: '/hotels',
    name: 'Hotels',
    meta: { title: 'Отели', icon: 'hotel' },
    component: _import('Hotels')
  },
  {
    path: '/users',
    name: 'Users',
    meta: { title: 'Пользователи', icon: 'user' },
    component: _import('Users')
  },
  {
    path: '/roles',
    name: 'Roles',
    meta: { title: 'Роли', icon: 'user' },
    component: _import('Roles')
  }
]

const router = createRouter(authRouterMap)

export const updateRouter = (newRoutes) => {
  const newRouter = createRouter(newRoutes)
  router.matcher = newRouter.matcher
}

// Default auth path
export default router
