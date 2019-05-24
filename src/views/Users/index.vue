<template lang="pug">
  el-container.wrapper
    el-main
      el-row(type="flex")
        h1 Пользователи
        el-col(:style="{alignSelf: 'center', marginLeft: '10px'}")
          el-button(icon="el-icon-plus", type="primary",  @click.stop="addUser", circle)
      el-row
        el-table(:data="users", :style="{ width: '100%' }")
          el-table-column(prop="Login", label="Login")
          el-table-column(prop="Name", label="Name")
          el-table-column(prop="Company", label="Company")
          el-table-column(prop="PhoneNumber", label="PhoneNumber")
          el-table-column(prop="Role", label="Role")
          el-table-column
            template(slot-scope="scope")
              el-button(
              type="text",
              size="small",
              @click.native.prevent="deleteUser(scope.$index, scope.row.Id)") Remove
</template>

<script>
  import { users } from '@/api'
  import { mapActions } from 'vuex'
  export default {
    name: 'Users',
    data() {
      return {
        users: null
      }
    },
    methods: {
      ...mapActions(['setSidePanel', 'closeSidePanel']),
      getUsers() {
        users({ method: 'get' }).then(({ data }) => {
          this.users = data
        })
      },
      addUser() {
        let cb = () => { this.getUsers(); this.closeSidePanel() }
        this.setSidePanel({ template: () => import('./addUser'), width: '460px', title: 'Новый пользователь', data: { cb } })
      },
      deleteUser(index, id) {
        users({ method: 'delete', data: { id } }).then(_ => {
          this.users = this.users.filter(item => item.Id !== id)
        })
      }
    },
    mounted() {
      this.getUsers()
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
  }
</style>
