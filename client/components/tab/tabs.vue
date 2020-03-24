<script>
import TabContainer from './tab-contanier.vue';

export default {
  name: 'Tabs',
  // 如果要使用，需要注意reative问题
  // provide () {
  //   return {
  //     value: this.value
  //   }
  // },
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  components: {
    TabContainer
  },
  render () {
    const panes = [...this.panes]
    return (
      <div class='tabs'>
        <ul class='tabs-header'>
          {this.$slots.default}
        </ul>
        <tab-container panes={panes} />
      </div>
    )
  },
  methods: {
    handleChangeTab (value) {
      this.$emit('on-change', value);
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0
  border-bottom 2px solid #ededed
</style>
