<template lang="pug">
  el-container
    el-main
      el-form(label-width="120px")
        el-form-item(label="Name")
          el-input(v-model="role.name")
        el-form-item(label="Description")
          el-input(v-model="role.description", type="textarea")
        el-button(type="primary", @click="addRole") Add
</template>

<script>
  import { roles } from '@/api'
  export default {
    name: 'AddRole',
    data() {
      return {
        role: {
          name: null,
          description: null
        }
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
      addRole() {
        roles({ method: 'post', data: this.role }).then(_ => {
          this.data.cb()
        }).catch(err => { throw new Error(err) })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
