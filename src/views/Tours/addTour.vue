<template lang="pug">
  el-container
    el-main
      el-form
        el-form-item(label="Name")
          el-input(v-model="tourInfo.name")
        el-form-item(label="Вместимость")
          el-input-number(v-model="tourInfo.capacity", :min="1" :max="9999")
        el-form-item(label="Описание")
          el-input(v-model="tourInfo.description",  type="textarea")
        el-button(type="primary", @click="addTour") Add
</template>

<script>
  import { tour } from '@/api'
  export default {
    name: 'AddTour',
    data() {
      return {
        tourInfo: {
          name: null,
          capacity: null,
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
      addTour() {
        this.tourInfo.capacity = parseInt(this.tourInfo.capacity)
        tour({ method: 'post', data: this.tourInfo }).then(() => {
          this.data.cb()
        }).catch(err => { throw new Error(err) })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
</style>
