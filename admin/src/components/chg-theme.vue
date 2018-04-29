<template>
  <div>
    <mu-icon-menu v-if="where=='header'&&docked" :value="theme" @change="changeTheme" icon="palette">
      <mu-menu-item v-for="(val, key) in themes" :key="key" :value="key" :title="val[0]" />
    </mu-icon-menu>
  </div>
</template>

<script>
import http from '../api/http'
import { mapState } from 'vuex'
export const theme = 'light'
export const themes = {
  'light': ['LIGHT (DEFAULT)', 'static/css/theme-default.css'],
  'dark': ['DARK', 'static/css/theme-dark.css'],
  'carbon': ['CARBON', 'static/css/theme-carbon.css'],
  'teal': ['TEAL', 'static/css/theme-teal.css']
}
export async function changeTheme(theme, ctx = this) {
  let styles = await http.get(themes[theme][1])
  ctx.theme = theme
  getThemeStyle().innerHTML = styles.data || ''
}
export function getThemeStyle() {
  const themeId = 'muse-theme'
  let styleEl = document.getElementById(themeId)
  if (styleEl) return styleEl
  styleEl = document.createElement('style')
  styleEl.id = themeId
  document.body.appendChild(styleEl)
  return styleEl
}
export default {
  props: ['where'],
  data() {
    return {
      theme,
      themes
    }
  },
  computed: {
    ...mapState(['docked', 'navHide', 'drOpen'])
  },
  methods: {
    changeTheme,
    getThemeStyle
  }
}
</script>

<style scoped>

</style>