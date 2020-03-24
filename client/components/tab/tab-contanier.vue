<script>
export default {
  props: {
    panes: Array
  },
  render () {
    const content = this.panes.map(item => {
      return item.active ? item.$slots.default : null;
    });
    return (
      <div class='tab-content'>
        {content}
      </div>
    )
  }
}
</script>
