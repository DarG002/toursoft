import Router, { updateRouter, authRouterMap, constRouterMap, asyncRouterMap } from '@/router'

const router = {
  state: {
    modules: []
  },
  mutations: {
    NEXT_ROUTER: (state, { routes, next = null }) => {
      updateRouter(routes)
      state.modules = routes
      next && Router.push(next)
    }
  },
  actions: {
    nextRoute({ commit }) {
      commit('NEXT_ROUTER', { routes: [ ...constRouterMap, ...asyncRouterMap ] })
    },
    resetRouter({ commit }) {
      commit('NEXT_ROUTER', { routes: authRouterMap, next: { name: 'Login' } })
    }
  }
}

export default router
