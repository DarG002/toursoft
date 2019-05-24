<template lang="pug">
  el-container.wrapper
    el-main
      el-row(type="flex")
        h1 Отели
        el-col(:style="{alignSelf: 'center', marginLeft: '10px'}")
          el-button(icon="el-icon-plus", type="primary", @click.stop="addHotel", circle)
      el-row
        el-table(:data="hotels", :style="{ width: '100%' }", v-loading="loading")
          el-table-column(prop="Name", label="Name")
          el-table-column(prop="Address", label="Address")
          el-table-column(prop="PhoneNumber", label="PhoneNumber")
          el-table-column
            template(slot-scope="scope")
              el-button(
              type="text",
              size="small",
              @click.native.prevent="deleteHotel(scope.$index, scope.row.Id)") Remove
</template>

<script>
  import { hotel } from '@/api'
  import { formatDateTime } from '@/utils'
  import { mapActions } from 'vuex'
  export default {
    name: 'Dashboard',
    data() {
      return {
        hotels: null,
        loading: true
      }
    },
    methods: {
      ...mapActions(['setSidePanel', 'closeSidePanel']),
      formatDate(row, column, cellValue) {
        return formatDateTime(cellValue)
      },
      getHotel() {
        this.loading = true
        hotel({ method: 'get' })
          .then(({ data }) => { this.hotels = data })
          .catch(err => { throw new Error(err) })
          .finally(() => { this.loading = false })
      },
      addHotel() {
        let cb = () => {
          this.closeSidePanel()
          this.getHotel()
        }
        this.setSidePanel({ template: () => import('./addHotel'), width: '400px', title: 'Создать отель', data: { cb } })
      },
      deleteHotel(index, id) {
        hotel({ method: 'delete', data: [{ id }] }).then(_ => {
          this.hotels = this.hotels.filter(item => item.Id !== id)
        })
      }
    },
    mounted() {
      this.getHotel()
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
  }
</style>
