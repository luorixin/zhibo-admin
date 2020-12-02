<template>
  <div class="searchWrapper" v-loading="loading">
    <div class="search-title" v-clickoutside="handleClose">
      <div @click="handleShow">
        <label
          :title="$t('header.agency') + ': ' + currentAgent.agentName"
          class="title-label"
        >
          {{ $t('header.agency') }}: {{ currentAgent.agentName }}
        </label>
        <label class="title-label_sub"
          >{{ $t('header.advertiser') }}:
          {{ currentAdvertiser ? currentAdvertiser.clientName : '' }}</label
        >
        <i class="fa fa-caret-down"></i>
      </div>
      <transition name="el-fade-in-linear">
        <div class="search-wrapper" v-show="showSearch" v-loading="loading">
          <div class="search-content">
            <div class="search-input-wrapper">
              <div class="search-content__input">
                <el-input
                  v-model="search"
                  :placeholder="$t('header.search')"
                  @input="handleSearch"
                  :clearable="true"
                >
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
            </div>
            <div class="search-content__recent">
              <label>{{ $t('header.recent') }}</label>
              <ul v-show="recentAdvertisers && recentAdvertisers.length > 0">
                <li
                  v-for="(item, key) in recentAdvertisers"
                  :key="'recent_' + item + key"
                >
                  <a href="javascript:;" @click="changeRight(item)">
                    <el-tooltip
                      placement="top"
                      :disabled="
                        !item.clientName || item.clientName.length < 30
                      "
                      :content="item.clientName"
                      effect="light"
                    >
                      <span>{{ item.clientName }}</span>
                    </el-tooltip>
                  </a>
                </li>
              </ul>
              <label
                v-show="!recentAdvertisers || recentAdvertisers.length === 0"
                class="noresult"
              >
                {{ $t('common.noResult') }}
              </label>
              <hr />
            </div>
            <div class="search-content__result">
              <label>{{ $t('header.allClients') }}</label>
              <ul v-show="agents && agents.length > 0">
                <li
                  v-for="(item, key) in agents"
                  :key="'all_' + item.agentId + key"
                >
                  <a href="javascript:;" @click="showChild(item)">
                    <i
                      class="fa"
                      :class="[
                        item.showChild ? 'fa-caret-down' : 'fa-caret-right'
                      ]"
                    ></i>
                    <el-tooltip
                      placement="top"
                      :disabled="item.agentName.length < 30"
                      :content="item.agentName"
                      effect="light"
                    >
                      <span>{{ item.agentName }}</span>
                    </el-tooltip>
                    <span class="result-tag">{{ item.agentId }}</span>
                  </a>
                  <ul class="result-tree" v-show="item.showChild">
                    <li
                      v-for="(adv, key) in item.clients"
                      :key="'child_' + adv.clientId + key"
                    >
                      <a href="javascript:;" @click="changeRight(adv)">
                        <el-tooltip
                          placement="top"
                          :disabled="!adv || adv.clientName.length < 30"
                          :content="adv.clientName"
                          effect="light"
                        >
                          <span>{{ adv.clientName }}</span>
                        </el-tooltip>
                        <span class="result-tag">{{ adv.clientId }}</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <label v-show="!agents || agents.length === 0" class="noresult">
                {{ $t('common.noResult') }}
              </label>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Clickoutside from '@/utils/clickoutside'
import * as authApi from '@/api/auth'
import Util from '@/utils'

export default {
  name: 'HeaderSearch',
  directives: {
    Clickoutside
  },
  data() {
    return {
      agents: [],
      allAgents: [],
      recentAdvertisers: [],
      currentAdvertiser: {
        clientName: null,
        clientId: null
      },
      currentAgent: {
        agentName: null,
        agentId: null
      },
      search: '',
      showSearch: false,
      loading: false,
      timer: null
    }
  },
  created() {
    this.getDataList()
    this.makeDebounce()
  },
  methods: {
    getDataList() {
      this.loading = true
      authApi
        .getRight()
        .then(data => {
          const userHeader = data.userHeader
          this.agents = userHeader.totalAgents.concat()
          let recents = userHeader.recentClients ? userHeader.recentClients : []
          this.recentAdvertisers = recents.filter(item => {
            return item !== null
          })
          this.currentAdvertiser = userHeader.currentClient
          this.currentAgent = userHeader.currentAgent
          this.agents.forEach(item => {
            this.$set(item, 'showChild', false)
          })
          this.allAgents = this.agents.concat()
        })
        .finally(() => {
          this.loading = false
        })
    },
    showChild(item) {
      item.showChild = !item.showChild
    },
    handleShow() {
      this.showSearch = !this.showSearch
    },
    handleClose() {
      this.showSearch = false
    },
    handleSearch(search) {
      this.debounceSearch(search)
    },
    makeDebounce() {
      this.debounceSearch = Util.debounce(search => {
        if (search !== '') {
          // let reg = new RegExp(search,'gi');
          search = search.toLowerCase()
          this.agents = this.allAgents.filter(item => {
            // if(reg.test(item.agentName)){
            //   reg.lastIndex=0;
            if (
              item.agentName.toLowerCase().includes(search) ||
              String(item.agentId) === search
            ) {
              return true
            } else {
              if (item.clients && item.clients.length > 0) {
                let adv = item.clients.find(el => {
                  // if(reg.test(el.clientName)){
                  //   reg.lastIndex=0;
                  if (
                    el.clientName.toLowerCase().includes(search) ||
                    String(el.clientId) === search
                  ) {
                    return true
                  }
                })
                if (adv) {
                  return true
                }
              }
            }
            return false
          })
          this.agents.forEach(item => {
            if (
              !item.agentName.toLowerCase().includes(search) &&
              String(item.agentId) !== search
            ) {
              if (item.clients && item.clients.length > 0) {
                item.clients = item.clients.filter(el => {
                  if (
                    el.clientName.toLowerCase().includes(search) ||
                    String(el.clientId) === search
                  ) {
                    return true
                  }
                })
              }
            }
          })
        } else {
          this.agents = this.allAgents.concat()
        }
      }, 300)
    },
    changeRight(adv) {
      this.loading = true
      authApi
        .changeRight(adv.clientId)
        .then(data => {
          if (data) {
            // Cookies.set('INSIGHTS_USER', data.insights_user)
            Util.setCookie('INSIGHTS_USER', data.insights_user)
            // this.$router.replace({name: this.$store.state.common.currentMenu})
            this.$router.replace({ path: '/refresh' })
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.searchWrapper {
  width: 250px;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-top: 8px;
  border-right: 1px solid #dfdfdf;
  .search-title {
    width: 100%;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    label {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
      line-height: 22px;
      font-size: 12px;
      display: block;
    }
    .title-label_sub {
      color: #ef4136;
      font-weight: bold;
      font-size: 12px;
    }
    .fa {
      position: absolute;
      font-size: 14px;
      padding: 2px 2px 0 0;
      top: 12px;
      right: 0;
      display: inline-block;
    }
    .search-wrapper {
      position: absolute;
      z-index: 1201;
      background-color: #fff;
      border: 1px solid #e3e3e3;
      top: 56px;
      left: -10px;
      padding: 5px 2px;
      width: 350px;
      overflow-x: hidden;
      .search-content {
        height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
        .search-input-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 350px;
          z-index: 1022;
          .search-content__input {
            position: relative;
            height: 25px;
            text-align: center;
            padding: 15px;
            background: #fff;
          }
        }
        .search-content__recent,
        .search-content__result {
          margin-top: 45px;
          label {
            color: #333;
            padding: 10px 15px 0 15px;
          }
          ul {
            margin: 0;
            font-size: 12px;
            li {
              white-space: nowrap;
              text-overflow: ellipsis;
              position: relative;
              height: auto;
              line-height: 18px;
              padding: 0 15px;
              margin-top: -1px;
              cursor: pointer;
              display: block;
              a {
                display: inline-block;
                line-height: 33px;
                height: 33px;
                width: 100%;
                margin-left: -15px;
                padding: 0 15px;
                &:hover {
                  background-color: #f5f5f5;
                  border: none !important;
                }
                span {
                  margin-left: 18px;
                }
              }
            }
          }
          .noresult {
            display: inline-block;
            line-height: 33px;
            height: 33px;
            width: 100%;
            color: #999;
            font-size: 12px;
            padding: 0 15px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        .search-content__result {
          margin-top: 0;
          font-size: 12px;
          .fa {
            background: transparent;
            position: absolute;
            left: 0;
            top: 0;
            padding: 10px 12px;
            cursor: pointer;
            width: 8px;
            text-align: center;
            &:hover {
              background: #7b7b7b;
            }
          }
          li span:first-of-type {
            margin-left: 18px;
            width: 250px;
            display: inline-block;
          }
          .result-tag {
            position: absolute;
            right: 15px;
            font-size: 10px;
          }
          .result-tree {
            display: block;
            transition: 0.5s;
            .result-tag {
              right: 0;
            }
            a {
              margin: 0 -30px;
              padding: 0 30px 0 30px;
              span {
                margin-left: 3px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
}
</style>
