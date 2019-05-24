import { setUserId } from '@/utils/auth'

const user = {
  state: {
    login: null,
    userId: null
  },
  mutations: {
    SET_LOGIN: (state, login) => {
      state.login = login
    },
    SET_USER_ID: (state, userid) => {
      state.userId = userid
      setUserId(userid)
    }
  },
  actions: {
    setUserInfo({ commit }, { login, userid }) {
      return new Promise((resolve) => {
        commit('SET_LOGIN', login)
        commit('SET_USER_ID', userid)
        resolve(login)
      })
    }
  }
}

export default user
