<template>
  <div class="header" :class="{'nav-hide':navHide}">
    <mu-appbar :title="cTitle">
      <mu-icon-button icon="menu" slot="left" @click="toggle()" />
      <mu-icon-button v-if="docked" icon="refresh" slot="left" @click="reload" tooltip="Refresh" touch/>
      <mu-icon-button icon="loyalty" slot="right" @click="toggleTodo" ref="todo" tooltip="TODO" touch/>
      <mu-flat-button v-if="docked" slot="right" label="admin" icon="account_circle" />
      <mu-icon-menu slot="right" icon="more_vert">
        <mu-menu-item v-for="(val, key) in settings" :key="key" :leftIcon="key" :title="val" />
      </mu-icon-menu>
      <Changetheme where="header" slot="right" />
    </mu-appbar>
    <mu-popover :trigger="trigger" :open="popoverOpen" @close="handlePopoverClose">
      <Todo />
    </mu-popover>
  </div>
</template>

<script>
import Todo from './todo'
import Changetheme from './chg-theme'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      popoverOpen: false,
      trigger: null,
      settings: {
        'account_circle': '我的信息',
        'lock': '修改密码',
        'exit_to_app': '退出'
      }
    }
  },
  computed: {
    ...mapState(['docked', 'navHide', 'drOpen', 'cTitle'])
  },
  components: {
    Todo,
    Changetheme
  },
  mounted() {
    this.trigger = this.$refs['todo'].$el
  },
  methods: {
    toggle() {
      this.$store.commit('DROPEN', !this.drOpen)
      this.$store.commit('NAVHIDE', !this.navHide)
    },
    toggleTodo() {
      this.popoverOpen = !this.popoverOpen
    },
    handlePopoverClose(e) {
      this.popoverOpen = false
    },
    reload() {
      this.$parent.reload()
    }
  }
}
</script>

<style scoped>

</style>