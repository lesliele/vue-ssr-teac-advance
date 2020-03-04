import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import VueRouter from 'vue-router'
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

router.beforeEach((to, from, next) => {
  // 可以进行登录操作
  console.log('before each invoke');
  // if (to.fullPath === '/app') {
  //   next('/login') next({path: ''})
  // } else {
  //   next()
  // }
  next();
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoke');
  next();
})

router.afterEach((to, from) => {
  console.log('after each invoke')
})

new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App)
})
