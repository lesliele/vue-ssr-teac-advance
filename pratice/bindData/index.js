import Vue from 'vue'

new Vue({
  el: '#root',
  template: '<div :style="obj">123</div>',
  data: {
    obj: {
      appearance: 'none'
    }
  }
})
