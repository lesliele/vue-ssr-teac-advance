import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import './assets/styles/global.styl'
import createRouter from './config/router'

const router = createRouter()
Vue.use(VueRouter)

new Vue({
  el: '#root',
  router,
  render: h => h(App)
})
