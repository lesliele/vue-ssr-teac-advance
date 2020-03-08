import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <ul>
        <li v-for="(item, index) in arr" :key="item">{{item}}</li>
      </ul>
      <div>
        <input type="checkbox" :value="1" v-model="arr"/> // 默认情况下value="1" 值是字符串, :value="1" 值才是数字
        <input type="checkbox" :value="3" v-model="arr"/>
        <input type="checkbox" :value="5" v-model="arr"/>
      </div>
      <input type="text" v-model="text"/> //输入值后为字符串类型
      <input type="text" v-model.number="text"/>
      <input type="text" v-model.lazy="text"/> //添加 lazy 修饰符，从而转变为使用 change 事件进行同步
    </div>
  `,
  data: {
    // 绑定的key后下次渲染找到一致的key选项进行复用, 不要使用index，可能会导致渲染错误
    arr: [1, 3, 5],
    text: 0
  }
})
