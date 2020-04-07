import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'


Vue.use(VueRouter);

const routes = [
  {
    // 首页路由配置
    path: "/",
    component: () => import("@/views/Index.vue")
  },
  {
    // 搜索页路由配置
    path: "/search",
    component: () => import("@/views/Search.vue")
  },
  {
    // 文章详情页路由配置
    path: "/post/:id",
    component: () => import("@/views/PostDetail.vue")
  },
  {
    // 视频文章详情页路由配置
    path: "/post/:id",
    component: () => import("@/views/Video.vue")
  },
  {
    // 登录页
    path: '/login',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Login.vue")
  },
  {
    // 分类栏目页
    path: '/category',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Category.vue")
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
    component: () => import("@/views/Personal.vue"),
    meta: {
      // 代表这个页面需要授权 -- 验证
      authorization: true
    },
  },
  {
    // 个人编辑页
    path: '/edit-profile',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/EditProfile.vue"),
    meta: {
      // 代表这个页面需要授权 -- 验证
      authorization: true
    },
  },
  {
    // 我的关注
    path: '/follow',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Follow.vue"),
    meta: {
      // 代表这个页面需要授权 -- 验证
      authorization: true
    },
  },
  {
    // 我的跟帖
    path: '/comment',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Comment.vue"),
    meta: {
      // 代表这个页面需要授权 -- 验证
      authorization: true
    },
  },
  {
    // 我的收藏
    path: '/star',
    // 除了首页之外的页面都可以用懒加载 @ 表示src
    // .vue 的扩展名可以忽略
    component: () => import("@/views/Star.vue"),
    meta: {
      // 代表这个页面需要授权 -- 验证
      authorization: true
    },
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router