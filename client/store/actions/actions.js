export default {
  // 用来处理异步请求，比如接口请求
  updateCountAsync (store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.number
      })
    }, data.time)
  }
}
