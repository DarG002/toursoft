// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import 'element-ui/lib/theme-chalk/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as solid from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n'

import './styles/main.scss'

import Default from './views/Layouts/Default'
import NoMenu from './views/Layouts/NoMenu'

import './utils/permissions'

Vue.component('default-layout', Default)
Vue.component('noMenu-layout', NoMenu)

Vue.use(ElementUI, { locale })

library.add(solid.faUser, solid.faHotel, solid.faSuitcaseRolling, solid.faTachometerAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
