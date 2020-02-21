<!--
 * @Author: your name
 * @Date: 2020-02-10 14:54:25
 * @LastEditTime: 2020-02-20 11:24:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ssr-tech\src\app.vue
 -->
<template>
    <div id="box">
        <div>
            <div ref="x">xxx    </div><div ref="f">fffffff</div>
        </div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
        <!-- <div class="inner"></div> -->
    </div>
</template>

<script>
import Header from './layout/header.vue';
import Footer from './layout/footer.jsx';
import Todo from './views/todo/todo.vue';

console.log(Header.__docs); //自定义块

export default {
    components: {
        Header,
        Footer,
        Todo
    },
    data() {
        return {
            
        }
    },
    mounted() {
        console.log(this.$refs.x.innerHTML+this.$refs.f.innerHTML)
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