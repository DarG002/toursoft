<template lang="pug">
  el-menu(:style="{ height: '100%' }")
    el-menu-item(v-for="item in router.modules", :key="item.name", @click="route(item.path)")
      font-awesome-icon(:icon="item.meta.icon")
      span {{ item.meta.title }}
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'sidebar.vue',
    data() {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        mini: true,
        right: null
      }
    },
    computed: {
      ...mapGetters(['router'])
    },
    methods: {
      route(to) {
        this.$route.path !== to && this.$router.push(to)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .svg-inline--fa {
    font-size: 1.1em;
    width: 28px;
    margin-right: 10px;
    color: #7f7f7f;
  }
</style>
