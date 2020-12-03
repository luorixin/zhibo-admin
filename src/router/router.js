import Home from '../views/common/Home.vue'
import i18n from '../locale'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'login.submit',
    noAuth: true
  },
  component: () => import('@/views/common/Login.vue')
}

export const page404 = {
  path: '/404',
  name: '404',
  meta: {
    title: '404',
    noAuth: true
  },
  component: () => import('@/views/common/404.vue')
}

export const page403 = {
  path: '/403',
  name: '403',
  meta: {
    title: '403',
    noAuth: true
  },
  component: () => import('@/views/common/403.vue')
}

export const refresh = {
  path: '/refresh',
  name: 'refresh',
  meta: {
    title: 'refresh',
    noAuth: true
  },
  component: () => import('@/components/common/Refresh.vue')
}

export const constantRoutes = [
  // redirctRouter,
  loginRouter,
  page403,
  page404,
  refresh
]

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/category',
    component: Home,
    // icon: 'fa fa-edit',
    meta: { title: 'menu.category' },
    children: [
      {
        path: 'list',
        name: 'categoryList',
        component: () => import('@/views/category/List.vue'),
        meta: { title: 'menu.category' }
      }
    ]
  },
  {
    path: '/material',
    component: Home,
    // icon: 'fa el-icon-bangzhu',
    meta: { title: 'menu.material' },
    children: [
      {
        path: 'list',
        name: 'material',
        component: () => import('@/views/material/List.vue'),
        meta: { title: 'menu.material' }
      }
    ]
  },
  { path: '*', redirect: '/404', meta: { title: '404', notInMenu: true } }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [...appRouter, ...constantRoutes]
