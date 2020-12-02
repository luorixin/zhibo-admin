<template>
  <div class="lang-wrap">
    <span
      @click="changeLang('en')"
      class="lang lang-en"
      :class="{ selected: currentLang === 'en' }"
    ></span>
    <span
      @click="changeLang('zh-CN')"
      class="lang lang-zh_CN"
      :class="{ selected: currentLang === 'zh-CN' }"
    ></span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LangChange',
  data() {
    return {}
  },
  computed: {
    ...mapState('common', ['currentLang'])
  },
  methods: {
    changeLang(locale) {
      this.$store.commit('common/changeLang', locale)
    }
  }
}
</script>

<style lang="scss">
.lang-wrap {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;

  .lang {
    width: 24px;
    height: 24px;
    border: 1px solid #e8ebec;
    display: inline-block;
    background-color: #e8ebec;
    border-radius: 24px;
    text-align: center;
    vertical-align: middle;
    transition: 0.1s;
    cursor: pointer;
    line-height: 24px;
    font-size: 12px;
    box-sizing: border-box;
    margin-right: 5px;

    &.selected {
      background-color: #e42824;
      color: #fff;
    }
  }

  .lang-en::after {
    content: 'E';
  }

  .lang-zh_CN::after {
    content: '中';
  }
}
</style>
