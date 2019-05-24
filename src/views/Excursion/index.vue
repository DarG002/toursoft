<template lang="pug">
  el-container.wrapper
    el-main
      el-row(type="flex")
        h1 Экскурсии
        el-col(:style="{alignSelf: 'center', marginLeft: '10px'}")
          el-button(icon="el-icon-plus", type="primary", @click.stop="addExcursion", circle)
      el-row
        el-table(:data="excursion", :style="{ width: '100%' }", @expand-change="collapse", v-loading="loading")
          el-table-column(type="expand")
            template(slot-scope="props")
              el-container
                el-table(:data="excursionGroup", :style="{ width: '100%' }", size="small", v-loading="!excursionGroup")
                  el-table-column(prop="name", label="Название")
                  el-table-column(prop="person.adultCount", label="Взрослые")
                  el-table-column(prop="person.childrenCount", label="Дети")
                  el-table-column(prop="person.babyCount", label="Младенцы")
                  el-table-column(prop="person.hotel", label="Отель")
                  el-table-column(label="Комнаты")
                    template(slot-scope="{ row : { person : { hotelRoom } } }")
                      span(
                        v-for="(room, index) in hotelRoom",
                        :key="index"
                        ) {{ room }} {{ (++index < hotelRoom.length) ? ' ,' : '' }}
                  el-table-column(label="Фото")
                    template(slot-scope="{ row : { person : { photosession } } }")
                      span {{ photosession ? 'Да' : 'Нет' }}
                  el-table-column(prop="person.pickUpTime", label="Время", :formatter="formatDate")
                  el-table-column(prop="person.comment", label="Комментарий")
                  el-table-column(prop="person.prepayment", label="Предоплата")
                  el-table-column(prop="person.leftToPay", label="Остаток")
          el-table-column(prop="DateTime", label="Дата", :formatter="formatDate", sortable)
          el-table-column(prop="Capacity", label="Вместимость")
          el-table-column(prop="TourName", label="Тур", sortable)
          el-table-column(prop="Description", label="Описание")
          el-table-column
            template(slot-scope="{ row }")
              el-button(
              type="text",
              size="small",
              @click.stop="addExcursionGroup(row.Id)") Добавить группу
          el-table-column
            template(slot-scope="scope")
              el-button(
              type="text",
              size="small",
              @click="deleteExcursion(scope.$index, scope.row.Id)") Удалить
</template>

<script>
  import { excursion, excursionGroup } from '@/api'
  import { formatDateTime } from '@/utils'
  import { mapActions } from 'vuex'
  export default {
    name: 'Excursion',
    data() {
      return {
        excursion: null,
        excursionGroup: null,
        loading: true
      }
    },
    methods: {
      ...mapActions(['setSidePanel', 'closeSidePanel']),
      formatDate(row, column, cellValue) {
        return formatDateTime(cellValue, 'DD MMM HH:mm')
      },
      getExcursion() {
        this.loading = true
        excursion({ method: 'get' }).then(({ data }) => {
          this.loading = false
          this.excursion = data
        })
      },
      addExcursion() {
        let cb = () => { this.getExcursion(); this.closeSidePanel() }
        this.setSidePanel({ template: () => import('./addExcursion'), width: '400px', title: 'Создать экскурсию', data: { cb } })
      },
      addExcursionGroup(excursionId) {
        let cb = () => { this.getExcursion(); this.closeSidePanel() }
        this.setSidePanel({ template: () => import('./addExcursionGroup'), width: '600px', title: 'Создать экскурсионную группу', data: { cb, excursionId } })
      },
      excursionGroupInfo(excursionId) {
        this.setSidePanel({ template: () => import('./excursionGroup'), width: '600px', title: 'Экскурсионная группа', data: { excursionId } })
      },
      deleteExcursion(index, id) {
        excursion({ method: 'delete', data: [{ id }] }).then(_ => {
          this.excursion = this.excursion.filter(item => item.Id !== id)
        })
      },
      collapse({ Id }, expanded) {
        if (expanded.length) {
          excursionGroup({ method: 'get', params: { excursionid: Id } }).then(({ data }) => {
            this.excursionGroup = data
          })
        } else {
          this.excursionGroup = null
        }
      }
    },
    mounted() {
      this.getExcursion()
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    .el-icon-info {
      margin-left: 10px;
      &:hover { cursor: pointer; }
    }
  }
</style>
