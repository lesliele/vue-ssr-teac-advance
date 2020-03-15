<template>
    <div id="box">
        <Header></Header>
        <!-- <p>{{count}}</p>
        <p>{{loveName}} +++++++++++++</p>
        <p>{{aState}}</p>
        <p>{{bState}}</p>
        <p>{{chinaName}}</p> -->
        <router-link to="/app/123">app123</router-link>
        <router-link to="/app/456">app456</router-link>
        <router-link to="/login">login</router-link>
        <router-link to="/login/extract">login extract</router-link>

        <!-- <transition name="fade">
          <router-view></router-view>
        </transition> -->
        <router-view></router-view>
        <!-- <router-view name="extract"></router-view> -->
        <Footer></Footer>
        <!-- <div class="inner"></div> -->
    </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

// console.log(Header.__docs) // 自定义块

export default {
  metaInfo: {
    title: 'dk app'
  },
  components: {
    Header,
    Footer
    // Todo
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      count: (state) => state.count,
      aState: (state) => state.a.text,
      bState: (state) => state.b.text
    }),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters({
      loveName: 'fullName',
      chinaName: 'a/chinaName'
    })
    // fullName () {
    //   return this.$store.getters.fullName
    // }
    // aState () {
    //   return this.$store.state.a.text;
    // },
    // bState () {
    //   return this.$store.state.b.text;
    // }
  },
  methods: {
    ...mapMutations(['a/updateText']),
    ...mapActions(['a/add'])
  },
  mounted () {
    // console.log(this.$refs.x.innerHTML + this.$refs.f.innerHTML)
    // console.log(this.$store)
    // this.$store.state.count = 1000; // 不推荐
    // let i = 0;
    // setInterval(() => {
    //   this.$store.commit('updateCount', { num2: i, num: ++i })
    // }, 1000)
    // this.$store.dispatch('updateCountAsync', {
    //   number: 12,
    //   time: 2000
    // })
    // 模块调用方式
    // this['a/updateText']('666999')
    this['a/add']({
      number: 199
    })
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
