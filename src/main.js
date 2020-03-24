// 导入 vue 构造函数
import Vue from 'vue'
// app 组件 (以 .vue 后缀名结尾的文件都是组件)
import App from './App.vue'
// 路由对象
import router from './router'

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
