import Vue from 'vue'

const component = {
  props: {
    order: String
  },
  template: `
    <div>
      <p>{{order}}</p>
      <p>{{name}} {{hobby}}</p>
    </div>
  `,
  data () {
    return {
      name: 'leslie',
      hobby: 'sex'
    }
  },
  mounted () {
    console.log('component mount')
  }
}
// 1.api调用
// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   propsData: {
//     order: '666'
//   },
//   data: {
//     name: 'dk' // 相同的会覆盖掉对象
//   },
//   mounted () {
//     console.log('extend mount')
//   }
// })

// 2.extends局部调用
const compB = {
  extends: component,
  data () {
    return {
      name: 'BBBB'
    }
  },
  mounted () {
    console.log(this.$parent.$options.name) // 获取父级的名称
  }
}

new Vue({
  name: 'root',
  el: '#root',
  components: {
    CompB: compB
  },
  template: '<comp-b></comp-b>'
})
