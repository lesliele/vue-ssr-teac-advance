import Vue from 'vue'

const comp = {
  template: '<div>this is a componentA</div>'
}

new Vue({
  el: '#root',
  components: {
    CompOne: comp
  },
  // 推荐使用
  template: '<comp-one></comp-one>'
})
