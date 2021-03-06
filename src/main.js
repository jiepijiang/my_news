// 导入 vue 构造函数
import Vue from 'vue'
// 引入Vant ui 组件库
import Vant, { Toast } from 'vant'
// app 组件 (以 .vue 后缀名结尾的文件都是组件)
import App from './App.vue'
// 路由对象
import router from './router'
// 导入 axios
import axios from "axios";

// 记录根实例
let app;
// 绑定到原型,加上以后就可以在组件中通过this.$axios来调用请求方法
Vue.prototype.$axios = axios;

// Vue.use 都是拿来注册插件的
Vue.use(Vant);

// 添加基准路径
axios.defaults.baseURL = "http://127.0.0.1:3000"
// 本地IP地址 -- 可以使用手机扫码打开
// axios.defaults.baseURL = "http://192.168.3.28:3000"
// 使用线上地址
// axios.defaults.baseURL = "http://hmtoutiao-api.atlansic.com"

// 上线环境是否提示信息(现在可以忽略)
Vue.config.productionTip = false;

// 添加路由守卫
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
router.beforeEach((to, from, next) => {
  // 判断是否去的个人中心页
  if (to.meta.authorization) {
    // 判断是否是登录状态,是否有token
    if (JSON.parse(localStorage.getItem('userInfo'))) {
      next();
    } else {
      // 跳转到登录页,next这个参数是可以传递路径,并且会跳转到该路径
      next({ path: "/login" })
    }
  } else {
    // 非个人中心页,畅通无阻
    next()
  }
});

// axios的响应拦截器 文档地址：https://github.com/axios/axios#interceptor
axios.interceptors.response.use(res => {
  return res;
}, error => {
  // 如果请求返回的结构是错误的，会进入到错误的处理函数中
  // error 是js原生的错误对象，我们可以用过error.response可以获取到详细的信息
  console.log(error.response);
  const { statusCode, message } = error.response.data;
  if (statusCode === 400) {
    Toast.fail(message)
  }
  // 处理状态码403的情况,表示token过期或者不存在
  if (statusCode === 403) {
    // 提示登录过期或者未登录
    Toast.fail("请先登录!");
    // window.location.href = 'http://localhost:8081' + "/login";
    app.$router.push({
      path: "/login",
      query: {
        return_url: app.$route.path
      }
    })

  }
  return Promise.reject(error)
})

// 创建一个根实例
// .$mount('#app') 相当于 el 配置,指定id为app 的元素作为模板
app = new Vue({
  // 路由对象
  router,
  // 加载第一个子组件,最低层的组件,写法是固定的
  render: h => h(App)
}).$mount('#app')
