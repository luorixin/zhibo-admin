<template>
  <div class="sidebarWrap" :class="{ smallScreen: smallScreen }">
    <ul class="x-menu">
      <li
        :class="parentSelected(item)"
        v-for="(item, key) in menuList"
        :key="'menu_' + key"
      >
        <a href="javascript:;" @click="handleSelect(item)">
          <i :class="item.icon"></i>
          <span>{{ $t(item.meta.title) }}</span>
          <i
            class="fa"
            :class="[item.showChild ? 'fa-caret-down' : 'fa-caret-right']"
            v-if="item.children && item.children.length > minShow"
          ></i>
        </a>
        <el-collapse-transition>
          <ul
            class="sub-menu"
            v-show="
              item.children && item.children.length > minShow && item.showChild
            "
          >
            <li
              :class="{ active: sub.name === currentMenu }"
              v-for="(sub, key) in item.children"
              :key="'subMenu_' + key"
            >
              <a href="javascript:;" @click="handleSelect(sub)">
                <span>{{ $t(sub.meta.title) }}</span>
              </a>
            </li>
          </ul>
        </el-collapse-transition>
      </li>
    </ul>
    <transition name="el-zoom-in-bottom">
      <ul
        class="x-menu-lang-select"
        v-show="showLang"
        :class="{ smallScreen: smallScreen }"
      >
        <li
          @click="handleChangeLang('zh-CN')"
          v-show="this.currentLang !== 'zh-CN' || !this.currentLang"
        >
          <a href="javascript:;">
            <i
              class="fa fa-cog fa-globe"
              aria-hidden="true"
              style="visibility: hidden"
            ></i>
            <span class="x-m8">简体中文</span>
          </a>
        </li>
        <li
          @click="handleChangeLang('en')"
          v-show="this.currentLang !== 'en' && !!this.currentLang"
        >
          <a href="javascript:;">
            <i
              class="fa fa-cog fa-globe"
              aria-hidden="true"
              style="visibility: hidden"
            ></i>
            <span class="x-m8">English</span>
          </a>
        </li>
      </ul>
    </transition>
    <ul
      class="x-menu-lang"
      :class="{ smallScreen: smallScreen }"
      v-clickoutside="handleClose"
      v-show="false"
    >
      <li @click="handleShowLang">
        <a href="javascript:;">
          <i class="fa fa-cog fa-globe" aria-hidden="true"></i>
          <span class="x-m8">{{ $t('language') }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Clickoutside from '@/utils/clickoutside'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'SideBar',
  directives: {
    Clickoutside
  },
  data() {
    return {
      smallScreen: false,
      showLang: false,
      minShow: 1, // child少于多少个隐藏子节点而直接显示父类
      menuList: []
    }
  },
  computed: {
    ...mapState('common', ['currentLang', 'currentMenu']),
    ...mapState('user', ['accessRoutes'])
  },
  watch: {
    $route: 'routeHandle'
  },
  created() {
    this.routeHandle(this.$route)
    this.buildMenu()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapMutations('common', ['changeLang', 'setCurrentMenu']),
    routeHandle(route) {
      this.setCurrentMenu(route.name)
      // 收缩未选中的父菜单
      this.menuList.forEach(item => {
        item.showChild = false
        if (item.children && item.children.length > 0) {
          let find = item.children.find(child => {
            return child.name === route.name
          })
          find && (item.showChild = true)
        }
      })
    },
    parentSelected(item) {
      if (item.children && item.children.length > 0) {
        let $find = item.children.find(el => {
          return el.name === this.currentMenu
        })
        if ($find) {
          return 'selected'
        }
      }
      return ''
    },
    handleSelect(item) {
      if (item.name) {
        this.$router.push({ name: item.name })
      } else {
        if (item.children.length > this.minShow) {
          // 展开收缩
          item.showChild = !item.showChild
        } else {
          this.$router.push({ name: item.children[0].name })
        }
      }
    },
    handleShowLang() {
      this.showLang = !this.showLang
    },
    handleClose() {
      this.showLang = false
    },
    handleChangeLang(locale) {
      this.$store.commit('common/changeLang', locale)
      this.$message.success(this.$t('common.optSuccess'))
      this.showLang = false
    },
    handleScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      let scrollHeight =
        document.documentElement.offsetHeight - window.innerHeight
      if (scrollHeight < 61) return
      var top = 61 - scrollTop
      if (top < 0) top = 0
      if (window.innerWidth > 1280) {
        top = 61
      }
      if (top === 0) {
        this.smallScreen = true
      } else {
        this.$el.style.top = ''
        this.smallScreen = false
      }
    },
    handleResize() {
      this.handleScroll()
    },
    buildMenu() {
      this.menuList = this.accessRoutes.filter(item => {
        this.$set(item, 'showChild', false)
        if (item.children && item.children.length > 0) {
          let find = item.children.find(child => {
            return child.name === this.currentMenu
          })
          find && (item.showChild = true)
        }
        return !item.redirect
      })
    }
  }
}
</script>

<style lang="scss">
.sidebarWrap {
  float: left;
  width: 185px;
  position: fixed;
  background: #000;
  height: 100%;
  min-height: 600px;
  z-index: 2000;
  margin-left: -5px;
  &.smallScreen {
    position: fixed !important;
    top: 0;
  }
  .x-menu {
    height: 100%;
    li {
      cursor: pointer;
      overflow: hidden;
      border-left: 5px solid #efefef;
      & > a {
        background: #000;
      }
      &.selected > a {
        background: #e3c581;
        border-left: 5px solid transparent;
        padding-left: 10px;
        .fa {
          color: #333;
        }
        .fa-caret-down,
        .fa-caret-right {
          color: #333 !important;
        }
        span {
          color: #333;
          font-weight: bold;
        }
      }
      a {
        padding-left: 15px;
        display: inline-block;
        width: 100%;
        min-height: 40px;
        text-decoration: none;
        position: relative;
        padding-top: 10px;
        box-sizing: border-box;
        .fa {
          width: 16px;
          height: 16px;
          font-size: 16px;
          top: 1px;
          position: relative;
          color: #fff;
          float: left;
        }
        .fa-caret-down,
        .fa-caret-right {
          position: absolute;
          top: 10px;
          right: 10px;
        }
      }
      a:hover {
        background-color: #d1b87c !important;
      }
      span {
        color: #fff;
        cursor: pointer;
        display: block;
        margin: 0 5px 5px 25px;
        line-height: 20px;
        font-size: 14px;
      }
    }
    .sub-menu {
      background-color: #dfdfdf;
      li {
        border-left: 0;
        a {
          padding-left: 35px;
        }
        span {
          margin: 0 0 0 5px;
        }
        &.active span {
          font-weight: bold;
          color: #666;
        }
      }
    }
  }
  .x-menu-lang-select {
    background-color: #dfdfdf;
    position: fixed;
    bottom: 40px;
    width: 180px;
    min-height: 40px;
    &.smallScreen {
      position: fixed !important;
      width: 185px !important;
    }
  }
  .x-menu-lang-select li {
    line-height: 40px;
    cursor: pointer;
    overflow: hidden;
    border-left: 5px solid transparent;
  }
  .x-menu-lang-select li:hover > a {
    background-color: #d9d9d9;
  }
  .x-menu-lang-select li a {
    padding-left: 15px;
    display: inline-block;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
  .x-menu-lang-select li span {
    color: #999;
    cursor: pointer;
    margin-left: 10px;
  }
  .x-menu-lang-select li:hover > a > span {
    font-weight: bold;
    color: #666;
  }
  .x-menu-lang {
    position: fixed;
    bottom: 0;
    height: 40px;
    width: 180px;
    &.smallScreen {
      position: fixed !important;
      width: 185px !important;
    }
  }
  .x-menu-lang li {
    line-height: 40px;
    cursor: pointer;
    overflow: hidden;
    border-left: 5px solid transparent;
  }
  .x-menu-lang li a {
    padding-left: 15px;
    display: inline-block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    cursor: pointer;
    color: #666;
  }
  .x-menu-lang li span {
    color: #666;
    cursor: pointer;
    margin-left: 10px;
  }
  .x-menu-lang li:hover > a > span {
    color: #666;
  }
}
@media (max-width: 1280px) {
  .sidebarWrap {
    position: absolute !important;
  }
  .x-body {
    padding: 0 0 0 200px !important;
  }
  .x-menu-lang {
    position: absolute !important;
    width: 100% !important;
  }
  .x-menu-lang-select {
    position: absolute !important;
    width: 100% !important;
  }
}
</style>
