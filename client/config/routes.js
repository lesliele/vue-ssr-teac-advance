// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    // path: '/app',
    // props: true, // 在组件作为props传进去
    // props: {
    //   id: '6611'
    // },
    props: (route) => ({ id: route.params.id }), // 解耦，可以不采用this.$route去调用
    // component: Todo,
    component: () => import('../views/todo/todo.vue'),
    // components: {
    //   default: Todo,
    //   extract: Login
    // },
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'xxxw' // 有利于搜索
    },
    beforeEnter (to, from, next) {
      console.log('app routes enter')
      next()
    }
    // children: [
    //   {
    //     path: 'details',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
  // {
  //   path: '/login/extract',
  //   component: Login
  // }
]
