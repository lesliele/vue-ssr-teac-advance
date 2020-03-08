import Router from 'vue-router'
import routes from './routes.js'
// 这里要保证引用时候都是生成一个新的router,跟服务端渲染有关，后续讲解服务端渲染再理解
export default () => {
  return new Router({
    routes,
    mode: 'history', // 默认hash ,不利于搜索，不美观
    // base: '/dk/', // 应用的基路径
    linkActiveClass: 'link-active', // 默认router-link-active
    linkExactActiveClass: 'exact-link-active', // 默认router-link-exact-active 只有完全匹配路径才会出现该class，匹配部分路径则出现linkActiveClass
    scrollBehavior (to, from, savedPosition) { // 可以自定义路由切换时页面如何滚动
      console.log(to)
      console.log(from)
      console.log(savedPosition) // 没有记录时null
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // parseQuery (str) {
    //   console.log(str) // 对query处理 提供自定义查询字符串的解析/反解析函数
    // },
    // stringifyQuery (obj) {
    //   console.log(obj) // 对query处理 提供自定义查询字符串的解析/反解析函数
    // },
    fallback: true // 当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式
  })
}
