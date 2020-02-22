<template>
    <div class="item">
        <input
            type="checkbox"
            class="item_box"
            v-model="todo.completed"/>
        <label :class="[todo.completed ? 'checked' : '']">{{todo.content}}</label>
        <button type="button" @click="delTodo">del</button>
    </div>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    delTodo () {
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.item {
    .checked{
        color red
    }
}
</style>
