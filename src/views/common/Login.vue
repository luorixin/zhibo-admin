<template>
  <div class="login-bg">
    <div class="login-container">
      <div class="login-head">
        <div class="login-title">
          <span>{{ $t('login.welcome') }}</span>
        </div>
      </div>
      <div class="login-wrap">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              :placeholder="$t('login.username')"
              size="medium"
              ref="username"
              class="ms-input"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :placeholder="$t('login.password')"
              size="medium"
              ref="password"
              v-model="ruleForm.password"
              @keyup.enter.native="submitForm('ruleForm')"
            >
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button
              :loading="loading"
              :disabled="isDisabled"
              class="sub-btn"
              type="primary"
              size="medium"
              @click.native.prevent="submitForm"
              >{{ $t('login.submit') }}</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import LangChange from '@/components/common/LangChange'
export default {
  name: 'Login',
  data() {
    return {
      privacyLang: 'privacy_en',
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: this.$t('login.username'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('login.password'),
            trigger: 'blur'
          }
        ]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    '$i18n.locale': {
      handler: function (val) {
        this.privacyLang =
          this.$i18n.locale === 'en' ? 'privacy_en' : 'privacy_zh_CN'
      },
      immediate: true
    }
  },
  computed: {
    isDisabled() {
      return this.ruleForm.username === '' || this.ruleForm.password === ''
    }
  },
  mounted() {
    if (this.ruleForm.username === '') {
      this.$refs.username.focus()
    } else if (this.ruleForm.password === '') {
      this.$refs.password.focus()
    }
    window.document.body.setAttribute('style', 'height:100%')
    window.document
      .getElementsByTagName('html')[0]
      .setAttribute('style', 'height:100%')
    window.document.getElementById('app').setAttribute('style', 'height:100%')
  },
  beforeDestroy() {
    window.document.body.removeAttribute('style')
    window.document.getElementsByTagName('html')[0].removeAttribute('style')
    window.document.getElementById('app').removeAttribute('style')
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.ruleForm)
            .then(() => {
              let path = this.redirect || '/'
              this.$router.push({ path: path })
              this.loading = false
            })
            .catch(error => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-bg {
  width: 100%;
  height: 100%;
  position: relative;
  // background: #3bc0c3;
  font-size: 12px;
  .login-container {
    width: 500px;
    height: 200px;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .login-head {
      line-height: 50px;
      span {
        font-size: 28px;
      }
    }
    .login-wrap {
      width: 330px;
      .ms-input {
        input {
          height: 50px;
          line-height: 50px;
        }
      }
    }
    .login-btn {
      .sub-btn {
        width: 100%;
        background: #e3c581;
        border-color: #e3c581;
        &.is-disabled {
          background: #d7d7d7;
          border-color: #d7d7d7;
        }
      }
    }
  }
}
</style>
