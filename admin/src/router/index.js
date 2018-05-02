import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import auth from './auth'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  let title = to.meta.pageTitle
  let bread = to.meta.bread
  if (title) {
    // document.title = title
    store.commit('CTITLE', title)
  }
  if (bread) {
    store.commit('BREAD', bread)
  }
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (auth.loggedIn()) {
      next()
    } else {
      next({ path: '/Logon', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {

})

export default router
