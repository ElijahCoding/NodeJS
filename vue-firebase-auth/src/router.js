import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import SignIn from './views/SignIn.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
          auth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: {
          guest: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: {
          guest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
    if (!store.getters.user.loggedIn && to.meta.auth) {
        next({
            name: 'signin',
            query: {
                redirect: to.fullPath
            }
        })
    }

    if (store.getters.user.loggedIn && to.meta.guest) {
        next({
            name: 'home'
        })
    }
    next();
})

export default router
