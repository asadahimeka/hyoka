import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth'

import HelloWorld from '@/components/HelloWorld'
import Index from '../views/index.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '*',
      name: 'Notfound',
      component: Index
    }
  ]
})

router.beforeEach((to, from, next) => {
  to.meta.pageTitle ? document.title = to.meta.pageTitle : 0
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

export default router
