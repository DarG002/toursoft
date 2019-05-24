import Vue from 'vue'
import VueI18n from 'vue-i18n'

import Formatter from './formatter'
import { defaultLocale, messages, locales } from './locales'

const locale = locales[defaultLocale]

const formatter = new Formatter({ locale })

Vue.use(VueI18n)

export default new VueI18n({
  locale,
  formatter,
  messages
})
