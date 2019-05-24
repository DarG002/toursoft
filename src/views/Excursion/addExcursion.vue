<template lang="pug">
  el-container
    el-main
      el-form(label-width="120px")
        el-form-item(label="Дата")
          el-date-picker(
            v-model="excursionInfo.dateTime",
            type="datetime",
            placeholder="Select date and time")
        el-form-item(label="Тур")
          el-select(v-model="excursionInfo.tourId", filterable, placeholder="Select")
            el-option(
              v-for="item in tours",
              :key="item.Id",
              :label="item.Name",
              :value="item.Id")
        el-form-item(label="Роль")
          el-select(v-model="excursionInfo.roleId", filterable, placeholder="Select")
            el-option(
            v-for="item in roles",
            :key="item.Id",
            :label="item.Name",
            :value="item.Id")
        el-form-item
          el-button(type="primary", @click="addExcursion") Add
</template>

<script>
  import { getTour, excursion, roles } from '@/api'
  export default {
    name: 'AddTour',
    data() {
      return {
        excursionInfo: {
          dateTime: null,
          status: true,
          roleId: null,
          tourId: null
        },
        tours: null,
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
      addExcursion() {
        excursion({ method: 'post', data: this.excursionInfo }).then(_ => {
          this.data.cb()
        }).catch(err => {
          throw new Error(err)
        })
      }
    },
    mounted() {
      roles({ method: 'get' }).then(({ data }) => {
        this.roles = data
      })
      getTour().then(({ data }) => {
        this.tours = data
      })
    }
  }
</script>

<style lang="scss" scoped>
</style>
