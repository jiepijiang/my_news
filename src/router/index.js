import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '../views/Login.vue'
// 导入注册组件
import Register from '../views/Register.vue'
// 导入个人中心页组件
import Personal from '../views/Personal.vue'

Vue.use(VueRouter);

const routes = [
  {
    // 登录页
    path: '/login',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Login.vue")
  },
  {
    // 注册页
    path: '/register',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Register.vue")
  },
  {
    // 个人中心页
    path: '/personal',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Personal.vue")
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
