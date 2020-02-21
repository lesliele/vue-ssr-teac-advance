<!--
 * @Author: your name
 * @Date: 2020-02-11 15:21:07
 * @LastEditTime: 2020-02-20 14:58:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-ssr-tech\src\todo\header.vue
 -->
<template>
    <header :class="$style.mainHeader">
        <h1>leslie cheung</h1>
    </header>    
</template>

<script>
export default {
    mounted() {
        console.log(this.$style)
    }
}
</script>

<style lang="stylus" module>
.main-header{
    h1{
        font-size: 46px
        color: red
        text-align center
    }
}
</style>

<docs>
leslie cheung 
</docs>
