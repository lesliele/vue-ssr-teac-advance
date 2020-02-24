import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this, 'beforeCreate', this.$el)
  },
  created () {
    console.log(this, 'created', this.$el)
  },
  beforeMount () { // 是否执行要看是否挂载到元素上
    console.log(this, 'beforeMount', this.$el)
  },
  mounted () { // 是否执行要看是否挂载到元素上, 这个时候数据才完全渲染出来
    console.log(this, 'mounted', this.$el)
  },
  activated () { // keep-alive相关
    console.log(this, 'activated')
  },
  deactivated () { // keep-alive相关
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  render: h => {
    // throw new TypeError('render null')
    console.log('render function') // 在beforeMount之后,在Mount之前(渲染后才显示 ps: vue-router会把template转为render function,提高渲染效率)
    return h('div', {}, 'dk')
  },
  renderError (h, err) {
    // 开发阶段才会触发，线上没有
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 正式环境上捕获错误，会向上冒泡传递
  }
})

app.$mount('#root')
