<template lang="pug">
  .test {{ text }}
  h1.hello {{ hello }}
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      hello: 'Welcome to Your Vue.js App'
    }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed: {
    text: function() {
      return this.data.text || ''
    }
  }
}
</script>
