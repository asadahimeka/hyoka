import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import auth from './auth'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach(async (to, from, next) => {
  let title = to.meta.pageTitle
  let bread = to.meta.bread
  if (title) {
    store.commit('CTITLE', title)
  }
  if (bread) {
    store.commit('BREAD', bread)
  }
  if (!to.meta.noAuth) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let loggedIn = await auth.loggedIn()
    if (!loggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // Make sure to call next()
  }
})

router.afterEach((to, from) => {

})

export default router
