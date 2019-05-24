<template lang="pug">
  el-container(:style="{ height: '100%' }")
    el-aside(width="240px")
      sidebar
    el-main
      slot
    side-panel
</template>

<script>
  import SidePanel from '@/components/SidePanel'
  import Sidebar from './components/Sidebar'

  export default {
    name: 'Layout-default',
    components: {
      SidePanel,
      Sidebar
    }
  }
</script>
