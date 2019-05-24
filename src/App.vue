<template lang="pug">
  #app
    component(:is="layout")
      router-view
</template>

<script>
  const defaultLayout = 'default'

  export default {
    name: 'App',
    computed: {
      layout: function() {
        return (this.$route.meta.layout || defaultLayout) + '-layout'
      }
    }
  }
</script>
