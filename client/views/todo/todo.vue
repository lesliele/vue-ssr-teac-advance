<template>
    <div class="todo">
        <input
            type="text"
            class="input_todo"
            placeholder="please enter value"
            @keyup.enter="addTodo"
        />
        <Item :todo="todo" v-for="todo in filterTodo" :key="todo.id" @del="handleDel"></Item>
        <helper :filter="filter" :todos="todos"></helper>
        <!-- <router-view/> -->
        <!-- <tabs :value="currentTab" @on-change="handleChange">
          <tab label="hello" index="1">
            <p>风继续吹 {{idx}}</p>
          </tab>
          <tab index="2">
            <p slot="label">llallala</p>
            <p>沉默是金</p>
          </tab>
          <tab label="world" index="3">
            <p slot="label">canvas</p>
            <p>共同度过</p>
          </tab>
        </tabs>
        <input v-model="idx" placeholder="测试插槽内数据绑定问题"/> -->
        <tabs :value="filter" @on-change="handleChange">
          <tab v-for="item in states" :key="item" :label="item" :index="item"></tab>
        </tabs>
    </div>
</template>

<script>
import Item from './item.vue'
import Helper from './helper.vue'
let id = 0
export default {
  metaInfo: {
    title: 'dk todo'
  },
  beforeRouteEnter (to, from, next) {
    // 检测数据，比如params中的id，是否有效，无效则弹出提示
    console.log('todo enter')
    console.log('this 指向' + this)
    // 如果此时要操作数据,可以通过next回调得到当前vue组件的实例
    next(vm => {
      console.log('数据是: ')
      console.log(vm)
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 数据变化(id)做数据的验证
    console.log('todo update')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo Leave')
    // 用户编辑信息离开时的提示
    // if (global.confirm('are you sure')) {
    //   next()
    // }
    next()
  },
  props: ['id'],
  components: {
    Item,
    Helper
  },
  data () {
    return {
      todos: [],
      filter: 'all',
      currentTab: 'all',
      idx: '',
      states: ['all', 'actived', 'completed']
    }
  },
  computed: {
    filterTodo () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(item => completed === item.completed)
    }
  },
  mounted () {
    // 切换同一个路由不同参数时候不会触发
    console.log('todo mounted---------')
    console.log(this.$route)
    // console.log(this.id)
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        completed: false,
        content: e.target.value
      })
      e.target.value = ''
    },
    handleDel (id) {
      this.todos.splice(this.todos.findIndex(item => item.id === id), 1)
    },
    handleChange (value) {
      console.log(value)
      this.filter = value;
    }
  }
}
</script>

<style lang="stylus" scoped>
.todo{
    width 500px
    height 400px
    background white
    margin 0 auto
    padding 10px
    .input_todo{
        display block
        width 300px
        height 50px
        margin 0 auto
        text-align center
    }
}
</style>
