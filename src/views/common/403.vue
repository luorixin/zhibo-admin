<template>
  <div class="error-bg">
    <div class="error-logo">
      <img src="../../assets/img/error/logo_iclick.png" />
    </div>
    <div class="error-container">
      <label class="error-title">{{ $t('errorPage.ops') }}</label>
      <label class="error-sub-title">{{ $t('errorPage.notexist') }}</label>
      <p>
        {{ $t('errorPage.tip1')
        }}<a href="javascript:;" @click="goBack" class="underline">{{
          $t('errorPage.tip2')
        }}</a>
        {{ $t('errorPage.tip3') }}
        <router-link to="/" class="underline">{{
          $t('errorPage.tip4')
        }}</router-link>
      </p>
      <p>
        {{ $t('errorPage.tip5')
        }}<a class="underline" href="mailto:technology@i-click.com"
          >technology@i-click.com</a
        >.
      </p>
      <div class="error-back">
        <el-button type="cancel" @click="goHome">
          {{ $t('errorPage.tip6') }}
        </el-button>
      </div>
    </div>
    <div class="error-type">
      <label>403</label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped lang="scss">
.error-bg {
  min-width: 1220px;
  min-height: 700px;
  position: relative;
  width: 100%;
  height: 100%;
  background: #ffffff url('../../assets/img/error/bg_error.jpg') no-repeat left
    top scroll;
  .error-logo {
    padding: 20px;
  }
  .error-container {
    margin-top: 100px;
    margin-left: 330px;
    text-align: left;
    color: #fff;
    .error-title {
      font-size: 80px;
      display: block;
      color: #fff;
      margin-bottom: 20px;
      line-height: 80px;
      font-style: italic;
    }
    .error-sub-title {
      font-size: 24px;
      color: #fff;
      margin: 15px 0;
      line-height: 24px;
    }
    p {
      font-size: 12px;
      margin: 15px 0;
      line-height: 12px;
    }
    a,
    a:hover {
      color: #fff;
    }
    .error-back {
      button {
        height: 30px;
        width: 80px;
      }
    }
  }
  .error-type {
    position: absolute;
    top: 50%;
    left: 70%;
    height: 80px;
    color: #fff;
    label {
      font-size: 80px;
      line-height: 80px;
      color: #fff;
      font-style: italic;
    }
  }
}
.underline {
  text-decoration: underline;
}
@media (min-width: 1290px) {
  .error-bg {
    background-size: cover;
  }
}
@media (min-height: 800px) {
  .error-bg {
    background-size: cover;
  }
}
</style>
