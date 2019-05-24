<template lang="pug">
  el-container.wrapper
    el-main
      el-row(type="flex")
        h1 Роли
        el-col(:style="{alignSelf: 'center', marginLeft: '10px'}")
          el-button(icon="el-icon-plus", type="primary",  @click.stop="addRole", circle)
      el-row
        el-table(:data="roles", :style="{ width: '100%' }")
          el-table-column(prop="Name", label="Name")
          el-table-column(prop="Description", label="Description")
          el-table-column
            template(slot-scope="scope")
              el-button(
              type="text",
              size="small",
              @click.native.prevent="deleteRole(scope.$index, scope.row.Id)") Remove
</template>

<script>
  import { roles } from '@/api'
  import { mapActions } from 'vuex'
  export default {
    name: 'Roles',
    data() {
      return {
        roles: null
      }
    },
    methods: {
      ...mapActions(['setSidePanel', 'closeSidePanel']),
      getRoles() {
        roles({ method: 'get' }).then(({ data }) => {
          this.roles = data
        })
      },
      addRole() {
        let cb = () => { this.getRoles(); this.closeSidePanel() }
        this.setSidePanel({ template: () => import('./addRole'), width: '460px', title: 'Создать роль', data: { cb } })
      },
      deleteRole(index, id) {
        roles({ method: 'delete', data: { id } }).then(_ => {
          this.roles = this.roles.filter(item => item.Id !== id)
        })
      }
    },
    mounted() {
      this.getRoles()
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
  }
</style>
