import Vue from 'vue'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'
import Util from '@/utils'
import VueRouter from 'vue-router'
import store from '@/store'
import i18n from '../locale'
import { appRouter, constantRoutes } from './router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

NProgress.configure({ showSpinner: false })

if (Util.getStore('userDetail')) {
  store.commit('user/setUserDetail', Util.getStore('userDetail'))
}

if (Util.getStore('currentLang')) {
  store.commit('common/changeLang', Util.getStore('currentLang'))
}

const whiteList = ['/login'] // no redirect whitelist

//使用钩子函数对路由进行权限跳转
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  Util.title(i18n.t(to.meta.title))

  const hasToken = Util.getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission permisson through getInfo
      const hasPermisson =
        store.state.user.accessRoutes &&
        store.state.user.accessRoutes.length > 0
      if (hasPermisson) {
        if (to.matched.length === 0) {
          // let item = Util.findItemFromArray(store.state.user.accessRoutes, "children", "name", to.name)
          Message.error(i18n.t('login.error.permisson'))
          from.name ? next({ name: from.name }) : next({ name: '403' })
        } else {
          next()
        }
      } else {
        try {
          // get user info
          // note: permisson must be a object array! such as: ['admin'] or ,['developer','editor']
          const permisson = await store.dispatch('user/getInfo')

          // generate accessible routes map based on permisson
          const accessRoutes = await store.dispatch(
            'user/generateRoutes',
            permisson
          )

          // store.commit('common/setMenusList', accessRoutes);

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true }, () => {})
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // console.log(error)
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
