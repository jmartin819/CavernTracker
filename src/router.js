import Vue from 'vue'
import Router from 'vue-router'
import UserHome from '@/views/UserHome.vue'
import SignIn from '@/views/SignIn'
import HeroList from '@/views/HeroList'
import UserStats from '@/views/UserStats'
import AuthGuard from './plugins/auth-guard'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/home',
      name: 'UserHome',
      component: UserHome,
      beforeEnter: AuthGuard
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/herolist',
      name: 'herolist',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HeroList,
      beforeEnter: AuthGuard
    },
    {
      path: '/userstats',
      name: 'userstats',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: UserStats
      //    beforeEnter: AuthGuard
    }
  ]
})
