import Vue from 'vue'
import store from '@/store'

// 是否有权限
const hasPermission = userPermission => {
  let userPermissionList = Array.isArray(userPermission)
    ? userPermission
    : [userPermission]
  // 当前用户的权限列表
  let permissionList = store.state.user.permission || []
  if (userPermissionList.length == 0) return true
  return userPermissionList.some(e => permissionList.includes(e))
}

// v-hasPermisson: 按钮权限控制
Vue.directive('hasPermisson', {
  inserted(el, binding, vnode, oldVnode) {
    if (!hasPermission(binding.value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
})

//v-loadmore: select滚动监听
Vue.directive('loadmore', {
  bind(el, binding) {
    let selectDom = el.querySelector(
      '.el-select-dropdown .el-select-dropdown__wrap'
    )

    selectDom.addEventListener('scroll', function () {
      if (this.scrollHeight - this.scrollTop <= this.clientHeight) {
        binding.value()
      }
    })
  }
})

// 全局判断方法
Vue.prototype.$_hasPermisson = hasPermission
