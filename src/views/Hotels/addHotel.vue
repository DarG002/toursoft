<template lang="pug">
  el-container
    el-main
      el-form
        el-form-item(label="Name")
          el-input(v-model="hotelInfo.name")
        el-form-item(label="Address")
          el-input(v-model="hotelInfo.address")
        el-form-item(label="PhoneNumber")
          el-input(v-model="hotelInfo.phoneNumber")
        el-button(type="primary", @click="addTour") Add
</template>

<script>
  import { hotel } from '@/api'
  export default {
    name: 'AddHotel',
    data() {
      return {
        hotelInfo: {
          name: null,
          address: null,
          phoneNumber: null
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
      addTour() {
        hotel({ method: 'post', data: this.hotelInfo }).then(() => {
          this.data.cb()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
