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
