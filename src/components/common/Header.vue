<template>
  <div class="headerWrapper">
    <div class="header">
      <div class="container">
        <div class="header-logo">
          <router-link to="/">
            <img src="../../assets/img/iclick.png" alt="logo" />
          </router-link>
        </div>
        <div class="header-search" v-if="!isExport">
          <header-search></header-search>
        </div>
        <div class="header-menu" v-if="!isExport">
          <ul class="menu-list">
            <li class="active">
              <router-link to="/">{{ $t('logo') }}</router-link>
            </li>
          </ul>
        </div>
        <div class="header-title" v-if="isExport">{{ exportTitle }}</div>
        <div class="header-info">
          <div class="header-info_date" v-if="isExport">{{ exportDate }}</div>
          <div
            v-if="!isExport"
            class="header-info__con"
            @click="showInfoCon"
            v-clickoutside="handleClose"
          >
            <span class="info-con__title">
              <i class="fa fa-user"></i>
              {{ userDetail }}
            </span>
            <i class="fa fa-caret-down"></i>
            <transition name="el-fade-in-linear">
              <ul class="info-con__list" v-show="infoShow">
                <span class="nav-arrow"></span>
                <li @click="loginOff">
                  <a href="javascript:;">
                    <span class="fa fa-sign-out"></span>
                    {{ $t('header.signout') }}
                  </a>
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSearch from '@/components/common/HeaderSearch.vue'
import Clickoutside from '@/utils/clickoutside'
import { mapState, mapActions } from 'vuex'
import Util from '@/utils'
export default {
  name: 'MyHeader',
  components: {
    HeaderSearch
  },
  directives: {
    Clickoutside
  },
  props: {
    isExport: {
      type: Boolean,
      default: false
    },
    exportTitle: {
      type: String,
      default: 'Symphony-iNsights'
    }
  },
  data() {
    return {
      infoShow: false,
      exportDate: Util.formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  computed: {
    ...mapState('user', ['userDetail'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    showInfoCon() {
      this.infoShow = !this.infoShow
    },
    handleClose() {
      this.infoShow = false
    },
    async loginOff() {
      let loginHref = '/login'
      await this.logout()
      this.$router.push(loginHref)
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.headerWrapper {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  text-shadow: none;
  box-sizing: border-box;
  border-bottom: 1px solid #e3e3e3;
  z-index: 1200;
  .header {
    height: 60px;
    background-color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 14px;
    z-index: 2000;
    position: relative;
    .container {
      padding: 0 20px 0 0px;
      display: flex;
      &::before {
        display: table;
        content: '';
      }
      .header-logo {
        height: 100%;
        width: 180px;
        line-height: 60px;
        a {
          display: inline-block;
          width: 100%;
          height: 44px;
          padding: 0;
          border-right: 1px solid #dfdfdf;
          text-align: center;
          vertical-align: middle;
          img {
            display: inline-block;
            height: 50px;
          }
        }
      }
      .header-menu {
        line-height: 60px;
        margin-left: 10px;
        .menu-list {
          overflow: hidden;
          li {
            float: left;
            & > a {
              padding: 10px 0 6px 0;
              margin: 0 15px;
              height: 40px;
              display: inline-block;
              line-height: 40px;
              color: #666;
              border-bottom: 4px solid transparent;
            }
            &.active > a {
              border-bottom-color: #ef4136;
              color: #ef4136;
            }
          }
        }
      }
      .header-info {
        width: 120px;
        flex: 1;
        text-align: right;
        line-height: 60px;
        cursor: pointer;
        .header-info__con {
          width: 150px;
          float: right;
          font-size: 12px;
          .info-con__title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 140px;
            float: left;
          }
          .info-con__list {
            position: absolute;
            right: 20px;
            z-index: 1201;
            background-color: #fff;
            border: 1px solid #e3e3e3;
            width: 154px;
            top: 56px;
            padding: 5px 2px;
            overflow-x: hidden;
            .nav-arrow {
              left: 80%;
              top: -7px;
              margin-left: -7px;
            }
            li {
              padding: 0 15px;
              height: 40px;
              margin-top: -1px;
              line-height: 33px;
              cursor: pointer;
              display: block;
              text-align: left;
              a {
                font-size: 12px;
                color: #666;
                line-height: 40px;
                width: 100%;
                display: inline-block;
                margin-left: -15px;
                padding: 0 15px;
                &:hover {
                  text-decoration: none;
                  background-color: #f5f5f5;
                  border: none !important;
                }
                .fa {
                  width: 14px;
                  height: 14px;
                  font-size: 14px;
                  display: inline-block;
                  vertical-align: middle;
                  border: none;
                  margin-right: 10px;
                }
              }
            }
          }
        }
        .header-info_date {
          height: 60px;
          line-height: 60px;
          font-size: 12px;
          margin-right: 20px;
        }
      }
      .header-title {
        height: 60px;
        line-height: 60px;
        font-weight: bold;
        font-size: 15px;
        margin-left: 20px;
      }
    }
  }
}
.nav-arrow {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  z-index: 1201;
  border-width: 6px;
  border-top-width: 0;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  &::after {
    content: '';
    top: 1px;
    margin-left: -6px;
    border-top-width: 0;
    border-bottom-color: #fff;
  }
}
@media (max-width: 1280px) {
  .headerWrapper {
    position: relative !important;
    min-width: 1280px !important;
  }
}
</style>
