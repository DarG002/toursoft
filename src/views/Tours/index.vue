<template lang="pug">
  el-container.wrapper
    el-main
      el-row(type="flex")
        h1 Туры
        el-col(:style="{alignSelf: 'center', marginLeft: '10px'}")
          el-button(icon="el-icon-plus", type="primary", @click.stop="addTour", circle)
      el-row
        el-table(:data="tours", :style="{ width: '100%' }", v-loading="loading")
          el-table-column(prop="Name", label="Name")
          el-table-column(prop="Capacity", label="Capacity")
          el-table-column(prop="Description", label="Description")
          el-table-column
            template(slot-scope="scope")
              el-button(
              type="text",
              size="small",
              @click.native.prevent="deleteTour(scope.$index, scope.row.Id)") Remove
</template>

<script>
  import { tour } from '@/api'
  import { formatDateTime } from '@/utils'
  import { mapActions } from 'vuex'
  export default {
    name: 'Dashboard',
    data() {
      return {
        tours: null,
        loading: true
      }
    },
    methods: {
      ...mapActions(['setSidePanel', 'closeSidePanel']),
      formatDate(row, column, cellValue) {
        return formatDateTime(cellValue)
      },
      getTour() {
        this.loading = true
        tour({ method: 'get' })
          .then(({ data }) => { this.tours = data })
          .catch(err => { throw new Error(err) })
          .finally(() => { this.loading = false })
      },
      addTour() {
        let cb = () => {
          this.closeSidePanel()
          this.getTour()
        }
        this.setSidePanel({ template: () => import('./addTour'), width: '400px', title: 'Создать тур', data: { cb } })
      },
      deleteTour(index, id) {
        tour({ method: 'delete', data: { id } }).then(_ => {
          this.tours = this.tours.filter(item => item.Id !== id)
        })
      }
    },
    mounted() {
      this.getTour()
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
  }
</style>
