import Util from '@/utils'
import actions from './actions.js'
import mutations from './mutations.js'

const state = {
  token: Util.getToken(),
  userDetail: null,
  permission: null,
  routes: null, //数据库树形json格式
  accessRoutes: null
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters: {
    getUser(state) {
      return state.userDetail
    }
  }
}
