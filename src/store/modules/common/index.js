import Util from '@/utils'
import i18n from '@/locale'

export default {
  namespaced: true,
  state: {
    currentLang: 'zh-CN',
    currentMenu: 'accountList'
  },
  mutations: {
    changeLang(state, data) {
      state.currentLang = data
      i18n.locale = data
      Util.setStore('currentLang', data)
    },
    setCurrentMenu(state, currentMenu) {
      state.currentMenu = currentMenu
      Util.setStore('currentMenu', state.currentMenu)
    }
  },
  actions: {}
}
