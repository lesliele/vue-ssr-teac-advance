import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)
console.log(123)
new Vue({
  render: h => h(App   )
}).$mount(root)
