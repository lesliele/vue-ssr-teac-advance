<template>
    <div class="todo">
        <input
            type="text"
            class="input_todo"
            placeholder="please enter value"
            @keyup.enter="addTodo"
        />
        <Item :todo="todo" v-for="todo in filterTodo" :key="todo.id" @del="handleDel"></Item>
        <Tabs :filter="filter" :todos="todos" @toggle="handelToggle"></Tabs>
        <!-- <router-view/> -->
    </div>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
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
    Tabs
  },
  data () {
    return {
      todos: [],
      filter: 'all'
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
    handelToggle (state) {
      this.filter = state
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
