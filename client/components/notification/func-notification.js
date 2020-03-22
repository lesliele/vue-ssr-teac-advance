import Notification from './notification.vue';

export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.setAutoClose()
  },
  methods: {
    setAutoClose () {
      this.timer = setTimeout(() => {
        this.isVisible = false
      }, this.autoClose)
    },
    clearTime () {
      if (this.timer) clearTimeout(this.timer);
    },
    afterEnter () {
      // 动画完成后才计算高度
      this.height = this.$el.offsetHeight;
    }
  },
  beforeDestroy () {
    this.clearTime(); // 页面销毁前需要清除定时器
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      timer: null,
      height: 0
    }
  }
}
