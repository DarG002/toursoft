import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import lang from './modules/lang'
import router from './modules/router'
import sidePanel from './modules/sidePanel'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    lang,
    router,
    sidePanel
  },
  getters
})

export default store
