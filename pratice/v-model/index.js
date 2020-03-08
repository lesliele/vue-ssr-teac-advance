import Vue from 'vue'

const compA = {
  props: {
    value1: String
  },
  model: {
    prop: 'value1', // 修改属性名
    event: 'change'
  },
  template: `
    <div>
      <input type="text" :value="value1" @input="handleInput"/>
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompA: compA
  },
  data: {
    value: '123'
  },
  // <comp-a :value="value" @input="value = arguments[0]"></comp-a>
  template: `
    <comp-a v-model="value"></comp-a>
  `
})
