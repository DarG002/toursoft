<template lang="pug">
  el-container.wrapper
    el-main
</template>

<script>
  import { formatDateTime } from '@/utils'
  import { mapActions } from 'vuex'
  export default {
    name: 'Dashboard',
    data() {
      return {
        excursion: null
      }
    },
    methods: {
      ...mapActions(['setSidePanel']),
      formatDate(row, column, cellValue) {
        return formatDateTime(cellValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
  }
</style>
