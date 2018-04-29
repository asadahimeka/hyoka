<template>
  <div class="drawer">
    <mu-drawer :open="drOpen" :docked="docked" @close="toggle()">
      <router-link to="/">
        <mu-appbar :title="drawerTitle">
          <mu-icon-button icon="home" slot="left" />
        </mu-appbar>
      </router-link>
      <div class="list">
        <mu-list @itemClick="drLitemClick" :value="selVal">
          <mu-list-item v-for="(item,i) in list" :to="item.to" :key="i" :value="item.title" :title="item.title" :toggleNested="!!item.items.length" :open="false">
            <mu-icon slot="left" :value="item.icon" />
            <template v-if="item.items.length">
              <mu-list-item v-for="(child,ii) in item.items" :to="child.to" :key="ii" :value="item.title" @click="!docked&&toggle()" slot="nested" :title="child.title">
                <mu-icon slot="left" :value="child.icon" />
              </mu-list-item>
              <mu-list-item v-if="item.title=='设置'" slot="nested" :value="theme" :nestedValue="theme" icon="palette" title="切换主题" toggleNested :open="false">
                <mu-icon slot="left" value="palette" />
                <mu-list-item v-for="(val, key) in themes" :key="key" :value="key" @click="chgThemeDrawer(key)" slot="nested" :title="val[0]" />
              </mu-list-item>
            </template>
          </mu-list-item>
        </mu-list>
      </div>
    </mu-drawer>
  </div>
</template>

<script>
import { theme, themes, changeTheme } from './chg-theme'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      drawerTitle: 'Hyoka Admin',
      selVal: '',
      theme,
      themes,
      list: [
        {
          icon: 'explore',
          title: '首页',
          to: '/index',
          items: []
        },
        {
          icon: 'date_range',
          title: '信息管理',
          items: [
            {
              icon: 'date_range',
              title: '课程信息管理'
            },
            {
              icon: 'person_add',
              title: '学生信息管理'
            },
            {
              icon: 'face',
              title: '教师信息管理'
            }
          ]
        },
        {
          icon: 'star_rate',
          title: '评价指标管理',
          items: []
        },
        {
          icon: 'list',
          title: '查看评价信息',
          items: []
        },
        {
          icon: 'settings',
          title: '设置',
          items: [
            {
              icon: 'account_circle',
              title: '我的信息'
            },
            {
              icon: 'lock',
              title: '修改密码'
            },
            {
              icon: 'exit_to_app',
              title: '退出'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState(['docked', 'navHide', 'drOpen'])
  },
  methods: {
    chgThemeDrawer(theme) {
      changeTheme(theme, this)
      !this.docked && this.toggle()
    },
    toggle() {
      this.$store.commit('DROPEN', !this.drOpen)
      this.$store.commit('NAVHIDE', !this.navHide)
    },
    drLitemClick(item) {
      // this.selVal = item.value
      !this.docked && !item.toggleNested && this.toggle()
    }
  }
}
</script>

<style scoped>
.list {
  overflow: auto;
  height: 90vh;
}
</style>