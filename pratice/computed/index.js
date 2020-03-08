import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
    <p>{{name}}</p>
    <p>{{mergeName()}}</p>
    <p>number: {{number}}</p>
    <input v-model="number"/>
    <input v-model="firstName"/>
    <p>fullName: {{fullName}}</p>
    <div>
      obj.a: <input v-model="obj.a"/>
    </div>
    </div>
  `,
  data: {
    firstName: 'leslie',
    lastName: 'cheung',
    number: 0,
    fullName: '',
    obj: {
      a: 0
    }
  },
  computed: {
    name () {
      // 会重新渲染该组件,通过使用缓存，提高性能
      console.log('computed')
      return `${this.firstName}  ${this.lastName}`
    }
  },
  watch: {
    // 只有数据改变才会渲染
    // firstName (newVal, oldVal) {
    //   this.fullName = newVal + this.lastName
    // },
    firstName: {
      handler (newVal, oldVal) {
        this.fullName = newVal + this.lastName
      },
      // 初始化就会执行
      immediate: true
    },
    obj: {
      // 监听对象监听的是引用关系
      handler () {
        console.log('obj chnage')
      },
      // 遍历其属性
      deep: true
    }
  },
  mounted () {
    this.obj = {
      b: '555'
    }
  },
  methods: {
    mergeName () {
      console.log('methods')
      return `${this.firstName}  ${this.lastName}`
    }
  }
})
