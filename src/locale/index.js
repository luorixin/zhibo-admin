import VueI18n from 'vue-i18n'
import Vue from 'vue'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enMessage from './lang/en'
import zhCNMessage from './lang/zh-CN'

Vue.use(VueI18n)

const messages = {
  en: Object.assign(enMessage, enLocale),
  'zh-CN': Object.assign(zhCNMessage, zhLocale)
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh-CN', // set locale
  messages // set locale messages
})

export default i18n
