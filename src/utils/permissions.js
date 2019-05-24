import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'

const loginPath = '/login'

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (!store.getters.router.modules.length) {
      store.dispatch('nextRoute', [])
      next({ ...to, replace: true })
    } else {
      next()
    }
  } else {
    to.path !== loginPath ? next(loginPath) : next()
  }
})
