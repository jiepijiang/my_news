import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '../views/Login.vue'
// 导入注册组件
import Register from '../views/Register.vue'
// 导入个人中心页组件
import Personal from '../views/Personal.vue'
// 导入个人编辑页
import EditProfile from '../views/EditProfile.vue'
// 导入我的关注页
import Follow from '../views/Follow.vue'
// 导入我的跟帖页
import Comment from '../views/Comment.vue'
// 导入我的收藏页
import Star from '../views/Star.vue'

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
  },
  {
    // 个人编辑页
    path: '/edit-profile',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/EditProfile.vue")
  },
  {
    // 我的关注
    path: '/follow',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Follow.vue")
  },
  {
    // 我的跟帖
    path: '/comment',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Comment.vue")
  },
  {
    // 我的收藏
    path: '/star',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Star.vue")
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router