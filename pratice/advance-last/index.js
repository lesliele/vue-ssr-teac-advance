import Vue from 'vue'

const childA = {
  template: `
    <div>child: {{data.value}}</div>
  `,
  inject: ['time', 'data'],
  mounted () {
    console.log(this.time, this.result)
  }
}

const compA = {
  // template: `
  //   <div>
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="footer">
  //       <slot name="footer"></slot>
  //     </div>
  //   </div>
  // `
  components: {
    ChildA: childA
  },
  template: `
    <div>
      <child-a></child-a>
      <slot name="header" :user="user"></slot>
    </div>
  `,
  data () {
    return {
      user: {
        name: 'leslie',
        age: 12
      }
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompA: compA
  },
  // provide: {
  //   time: 1960,
  //   result: this.timeValue // 还不能读取数据
  // },
  provide () {
    const data = {};
    Object.defineProperty(data, 'value', {
      get: () => this.timeValue,
      enumerable: true
    })
    return {
      time: 1960,
      data
    }
  },
  data: {
    timeValue: 'xxyy'
  },
  template: `
    <div>
      <input v-model="timeValue"/>
      <comp-a v-slot:header="slotProps">
        <p>this is header {{slotProps.user.age}}</p>
      </comp-a>
    </div>
  `
})
