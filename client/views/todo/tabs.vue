<template>
    <div class="tab_wrapper">
        <span>{{unFinishTodoLen}} item left</span>
        <span
            v-for="state in states"
            :key="state"
            :class="['tab', filter == state ? 'checked' : '']"
            @click="toggleState(state)">
            {{state}}
        </span>
        <button @click="clearAll">clear</button>
    </div>
</template>
<script>
export default {
    props: {
        filter: {
            type: String,
            required: true
        },
        todos: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            states: ['all', 'actived', 'completed']
        }
    },
    computed: {
        unFinishTodoLen() {
            return this.todos.filter(item => !item.completed).length;
        }
    },
    methods: {
        toggleState(state) {
            this.$emit('toggle', state);
        },
        clearAll() {

        }
    }
}
</script>
<style lang="stylus" scoped>
.tab_wrapper{
    .tab{
        cursor pointer
        font-size 20px
        &.checked{
            color red
        }
    }
}
</style>