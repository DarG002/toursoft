<template lang="pug">
  el-form.login
    el-form-item
      el-input(type="text", v-model="form.login", autocomplete="off")
    el-form-item
      el-input(type="password", v-model="form.password", autocomplete="off")
    el-form-item
      el-button(@click="login") {{ $t('BUTTON.LOGIN') }}
</template>

<script>
  import { login } from '@/api/auth'
  import { mapActions } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        form: {
          password: '',
          login: ''
        }
      }
    },
    methods: {
      ...mapActions(['authorization', 'nextRoute', 'setUserInfo']),
      login() {
        login({ ...this.form }).then(({ data: { access_token, login, userid } }) => {
          this.authorization({ token: access_token }).then(() => {
            this.setUserInfo({ login, userid })
            this.$router.push('/')
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
