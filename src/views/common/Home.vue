<template>
  <div class="container clearfix">
    <my-header></my-header>
    <side-bar></side-bar>
    <div class="x-body">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
      <div class="myfooter">
        <label> {{ $t('footer.power') }}{{ $t('footer.icp') }} </label>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/common/Header.vue'
import SideBar from '@/components/common/SideBar.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Home',
  components: {
    MyHeader,
    SideBar
  }
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  margin-left: 0;
  margin-right: 0;
  margin-top: 60px;
}
.x-body {
  float: right;
  position: relative;
  width: 100%;
  min-height: 660px;
  box-sizing: border-box;
  padding: 0 0px 0 200px;
  // margin-bottom: 30px;
}
.myfooter {
  position: absolute;
  bottom: 0;
  left: 185px;
  line-height: 30px;
  height: 30px;
  width: calc(100% - 200px);
  font-size: 12px;
  color: #999;
  text-align: center;
}
@media (max-width: 1280px) {
  .container {
    margin-top: 0px !important;
    min-width: 1280px !important;
  }
  .x-body {
    padding: 0 0 0 200px !important;
  }
}
</style>
