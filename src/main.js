import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import i18n from './locale'
import axios from 'axios'
import './assets/styles/index.scss'
import './directives'
import * as filters from './filters'

Vue.config.productionTip = false

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
  size: 'small'
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.$axios = axios

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
