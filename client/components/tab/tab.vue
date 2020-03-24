<script>
export default {
  name: 'Tab',
  // inject: ['value'],
  props: {
    index: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String
    }
  },
  computed: {
    active () {
      return this.$parent.value === this.index;
    }
  },
  render () {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} onClick={this.handleClick}>
        {tab}
      </li>
    )
  },
  methods: {
    handleClick () {
      this.$parent.handleChangeTab(this.index);
    }
  },
  mounted () {
    this.$parent.panes.push(this);
  }
}
</script>

<style lang="stylus" scoped>
.tab
  list-style none
  line-height 40px
  margin-right 30px
  position relative
  bottom -2px
  cursor pointer
  &.active
    border-bottom 2px solid blue
  &:last-child
    margin-right 0
</style>
