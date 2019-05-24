import { setToken, removeToken, removeUserId } from '@/utils/auth'

const auth = {
  state: {
    token: null,
    userID: null
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    LOGOUT: (state) => {
      state.token = null
      removeToken()
    },
    REMOVE_USER_ID: () => {
      removeUserId()
    }
  },
  actions: {
    authorization({ commit }, { token }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', token)
        resolve()
      })
    },
    logOut({ commit }) {
      return new Promise((resolve) => {
        commit('LOGOUT')
        commit('REMOVE_USER_ID')
        resolve()
      })
    }
  }
}

export default auth
