import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/content-post'
import setting from '@/components/setting'
import register from '@/components/register'
import login from '@/components/log-in'
import insert from '@/components/insert-post'
import portada from '@/components/portada'
import search from '@/components/search-user'
import posts from '@/components/section-post-user'
import deletePost from '@/components/delete-post'
import menu from '@/components/menu'
import firebase from 'firebase'
/* eslint-disable */
Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requiresAuth: true
      }
    },    
    {
      path: '/menu',
      name: 'menu',
      component: menu,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting,
    },
    {
      path: '/insert',
      name: 'insert',
      component: insert,
    },
    {
      path: '/search',
      name: 'search',
      component: search,
    },
    {
      path: '/post',
      name: 'posts',
      component: posts,
    },
    {
      path: '/portada',
      name: 'portada',
      component: portada,
    },
    {
      path: '/delete',
      name: 'delete',
      component: deletePost,
    } 
  ]
})
  router.beforeEach((to, from, next) => {
  const userAuth = firebase.auth().currentUser
  console.log(userAuth);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(!userAuth && requiresAuth) next('/') 
  else if(userAuth && !requiresAuth) next('home')
  else  next()
});
export default router
