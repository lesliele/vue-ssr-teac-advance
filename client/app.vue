<template>
    <div id="box">
        <Header></Header>
        <router-link to="/app">app</router-link>
        <router-link to="/login">login</router-link>
        <router-link to="/login/extract">login extract</router-link>

        <router-view></router-view>
        <Footer></Footer>
        <!-- <div class="inner"></div> -->
    </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

// console.log(Header.__docs) // 自定义块

export default {
  components: {
    Header,
    Footer,
    Todo
  },
  data () {
    return {

    }
  },
  mounted () {
    // console.log(this.$refs.x.innerHTML + this.$refs.f.innerHTML)
  }
}
</script>

<style lang="stylus" scoped>
#box{
    position relative
    top 0
    left 0
    width 100%
    height 100%
    .inner{
        position absolute
        left 0
        top 0
        background-color white
        opacity 0
        width 100%
        height 100%
    }
}
</style>
