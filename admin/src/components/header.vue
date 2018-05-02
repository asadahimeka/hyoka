<template>
  <div class="header" :class="{'nav-hide':navHide}">
    <mu-appbar :title="cTitle">
      <mu-icon-button icon="menu" slot="left" @click="toggle()" />
      <mu-icon-button v-if="docked" icon="refresh" slot="left" @click="reload" tooltip="Refresh" touch/>
      <mu-icon-button icon="loyalty" slot="right" @click="toggleTodo" ref="todo" tooltip="TODO" touch/>
      <mu-flat-button v-if="docked" slot="right" @click="$router.push('/setting/info')" label="admin" icon="account_circle" />
      <mu-icon-menu slot="right" icon="more_vert">
        <mu-menu-item v-for="(val, key) in settings" :key="key" :to="val[1]" :leftIcon="key" :title="val[0]" />
        <mu-menu-item @click="exit" leftIcon="exit_to_app" title="退出" />
      </mu-icon-menu>
      <Changetheme where="header" slot="right" />
    </mu-appbar>
    <mu-popover :trigger="trigger" :open="popoverOpen" @close="handlePopoverClose">
      <Todo where="header" />
    </mu-popover>
  </div>
</template>

<script>
import Todo from './todo'
import Changetheme from './chg-theme'
import { mapState } from 'vuex'
import { showDialog } from './dialog'
import { showPopup } from './popup'
export default {
  data() {
    return {
      popoverOpen: false,
      trigger: null,
      settings: {
        'account_circle': ['我的信息', '/setting/info'],
        'lock': ['修改密码', '/setting/pwd']
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
    },
    exit() {
      showDialog({
        title: '退出',
        text: '确定要退出吗？',
        submitFn: () => {
          showPopup('退出成功')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>