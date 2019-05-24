<template lang="pug">
  transition(v-if='open', name="fade")
    .side-panel(:style="{ width }", v-click-outside="hide")
      .side-panel__header(:style="{height: '42px'}")
        i.el-icon-close.close(@click="close")
        h2.title {{ title }}
      .side-panel__body
        keep-alive
          component(:is="template", :data="data")
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ClickOutside from 'vue-click-outside'
  export default {
    name: 'SidePanel',
    directives: {
      ClickOutside
    },
    computed: {
      ...mapGetters([
        'sidePanel'
      ]),
      open: function() {
        return this.sidePanel.open
      },
      width: function() {
        return this.sidePanel.width
      },
      noClose: function() {
        return this.sidePanel.noClose
      },
      title: function() {
        return this.sidePanel.title
      },
      template: function() {
        return this.sidePanel.template
      },
      data: function() {
        return this.sidePanel.data
      }
    },
    methods: {
      ...mapActions([
        'closeSidePanel'
      ]),
      close() {
        this.closeSidePanel()
      },
      hide() {
        if (!this.noClose) {
          this.close()
        }
      }
    },
    mounted() {
      document.addEventListener('keydown', (e) => {
        if (this.open && e.keyCode === 27) {
          this.close()
        }
      })
    }
  }
</script>

<style lang="scss">

  .fade-enter-active, .fade-leave-active {
    transition: transform .1s;
  }

  .fade-enter {
    transform: translate(100%, 0);
  }

  .fade-leave-to {
    transform: translate(100%, 0);
  }

  .side-panel {
    $grey: rgba(#eee, 1);
    position: fixed;
    height: 100%;
    right: 0;
    top: 0;
    background-color: #fff;
    box-shadow: -8px 0 16px lighten($grey, .1%), 0 0 8px lighten($grey, .28%);
    overflow: hidden;
    z-index: 2001;
    &__header {
      display: flex;
      padding: 0 10px;
      align-items:  center;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      .close {
        height: 32px;
        width: 32px;
        font-size: 1.8em;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
    &__body {
      flex: 1 1 100%;
      display: flex;
      height: 100%;
      overflow: auto;
    }
  }

</style>
