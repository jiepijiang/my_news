import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Login.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
