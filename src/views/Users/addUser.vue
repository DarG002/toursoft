<template lang="pug">
  el-container
    el-main
      el-form(label-width="120px")
        el-form-item(label="Login")
          el-input(v-model="userInfo.login", size="small")
        el-form-item(label="Password")
          el-input(v-model="userInfo.password", type="password", size="small")
        el-form-item(label="Name")
          el-input(v-model="userInfo.name", size="small")
        el-form-item(label="Phone")
          el-input(v-model="userInfo.phoneNumber", size="small")
        el-form-item(label="Company")
          el-input(v-model="userInfo.company", size="small")
        el-form-item(label="Role")
          el-select(v-model="userInfo.role", filterable, placeholder="Select", size="small")
            el-option(
            v-for="item in roles",
            :key="item.Id",
            :label="item.Name",
            :value="item.Id")
        el-button(type="primary", @click="addUser") Add
</template>

<script>
  import { users, roles } from '@/api'
  export default {
    name: 'AddUser',
    data() {
      return {
        userInfo: {
          login: null,
          name: null,
          phoneNumber: null,
          company: null,
          role: null,
          password: null
        },
        roles: null
      }
    },
    props: {
      data: {
        cb: {
          template: Function
        }
      }
    },
    methods: {
      addUser() {
        users({ method: 'post', data: this.userInfo }).then(_ => {
          this.data.cb()
        })
      }
    },
    mounted() {
      roles({ method: 'get' }).then(({ data }) => {
        this.roles = data
      })
    }
  }
</script>

<style lang="scss" scoped>
</style>
