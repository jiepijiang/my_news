// 导入 vue 构造函数
import Vue from 'vue'
// 引入Vant ui 组件库
import Vant from 'vant'
// app 组件 (以 .vue 后缀名结尾的文件都是组件)
import App from './App.vue'
// 路由对象
import router from './router'
// 导入 axios
import axios from "axios";

// 绑定到原型,加上以后就可以在组件中通过this.$axios来调用请求方法
Vue.prototype.$axios = axios;

// Vue.use 都是拿来注册插件的
Vue.use(Vant);

// 上线环境是否提示信息(现在可以忽略)
Vue.config.productionTip = false

// 创建一个根实例
// .$mount('#app') 相当于 el 配置,指定id为app 的元素作为模板
new Vue({
  // 路由对象
  router,
  // 加载第一个子组件,最低层的组件,写法是固定的
  render: h => h(App)
}).$mount('#app')
