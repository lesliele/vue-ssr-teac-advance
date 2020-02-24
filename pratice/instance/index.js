import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div>{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
})
let i = 0
setInterval(() => {
  // app.text += 1
  i += 1
  // app.obj.a = i
  // 如果在obj中没有先声明属性a,那么即使值变化也不会响应式的改变，1.可以通过app.$forceUpdate()强制渲染;2.直接在obj声明a;3.通过$set设置，声明属性a 为reactive
  app.$set(app.obj, 'a', i)
  // app.$forceUpdate()
  // app.$options.data += 1 // 不会引起变化
}, 1000)

console.log(app.$options) // 实例中的各个参数
console.log(app.$data.text) // app.text通过app.$data代理得到的

// app.$options.render = h => {
//   return h('div', {}, 'dk')
// }
console.log(app.$root)
console.log(app.$root === app)
console.log(app.$scopedSlots)
console.log(app.$isServer) // 是否服务端渲染
// 如果采用这种监听方式，需要手动去销毁监听，否则会造成内存溢出
// const unWatch = app.$watch('text', (nV, oV) => {
//   console.log(nV, oV)
// })
// console.log(unWatch)
// setTimeout(() => {
//   unWatch()
// }, 2000)
app.$mount('#root')
