import Util from '@/utils'

export default {
  setToken(state, data) {
    state.token = data
  },
  setUserDetail(state, data) {
    if (!data) {
      localStorage.userDetail = null
      state.userDetail = null
    } else {
      if (typeof data === 'string') {
        // let result = JSON.parse(data);
        localStorage.userDetail = data
        state.userDetail = data
      } else {
        localStorage.userDetail = JSON.stringify(data)
        state.userDetail = data
      }
    }
  },
  setPermission(state, data) {
    if (data) {
      // localStorage.permission = data;
      state.permission = data
    } else {
      localStorage.permission = null
      state.permission = null
    }
  },
  setRoute(state, data) {
    if (!data) {
      state.routes = null
    } else {
      if (typeof data === 'string') {
        let result = JSON.parse(data)
        state.routes = result
      } else {
        state.routes = data
      }
    }
  },
  setAccessRoutes(state, data) {
    if (data) {
      if (Array.isArray(data)) {
        // localStorage.accessRoutes = JSON.stringify(data);
        state.accessRoutes = data
      } else {
        let routes = JSON.parse(data)
        // localStorage.accessRoutes = JSON.stringify(routes);
        state.accessRoutes = routes
      }
    } else {
      // localStorage.accessRoutes = null;
      state.accessRoutes = null
    }
  }
}
