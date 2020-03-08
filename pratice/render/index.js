import Vue from 'vue'

const compA = {
  render (h) {
    const that = this;
    return h('div', {
      on: {
        click () {
          console.log(that)
          that.$emit('click')
        }
      }
    }, [
      h('p', {}, 'title'),
      this.$slots.header
    ])
  }
}

new Vue({
  el: '#root',
  components: {
    CompA: compA
  },
  data: {
    value: '66'
  },
  render (h) {
    return h('comp-a', {
      ref: 'compA',
      // vue会自动执行触发(相当于自动生成$emit),组件使用的
      // nativeOn: {
      //   click () {
      //     console.log('clicked')
      //   }
      // },
      on: {
        // 需要内部$emit才能触发
        click () {
          console.log('clicked2')
        }
      }
    }, [
      h('span', {
        ref: 'span',
        slot: 'header'
      }, this.value)
    ])
  }
})
