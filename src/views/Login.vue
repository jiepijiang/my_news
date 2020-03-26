// 1.在views文件夹创建一个登录页,大组件放在views,小组件放在components  快速生成模板 shift + < 

// 2.配置路由
<template>
  <div class='container'>
    <!-- 左上角的小叉叉 -->
    <div class="back-btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- 正中间的 NEW图标 -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 表单 -->
    <div class="form">
      <!-- 用户名 -->
      <div class="form-item">
        <input type="text" placeholder="用户名 / 手机号码" v-model="form.username"/>
      </div>
      <!-- 密码 -->
      <div class="form-item">
        <input type="password" placeholder="密码" v-model="form.password">
      </div>
      <!-- 登录按钮 -->
      <div class="form-item">
        <button @click="handleClick()">登录</button>
      </div>
    </div>

  </div>
  
</template>

<script>
export default {
  data() {
    return {
      // 保存表单数据
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    handleClick() {
      // 轻提示 -- test
      // this.$toast("登录成功!");
      // 调用 axios 发起异步请求,类似 $.ajax
      this.$axios({
        // 请求地址
        url: "http://127.0.0.1:3000/login",
        // 请求方式
        method: "POST",
        // 参数
        data: this.form
        //  .then 里面的函数就是 请求成功 后的 回调函数
      }).then(res => {
        console.log(res);
        // 获取成功返回的信息
        const { message } = res.data;
        // console.log(this);
        this.$toast.success(message);
      });
    }
  }
};
</script>

<style lang="less">
.container {
  padding: 20 / 360 * 100vw;
}

// 样式会被iconfont覆盖的，所以要选中span
.back-btn span {
  font-size: 27 / 360 * 100vw;
  line-height: 1;
}

.logo {
  text-align: center;
  margin-top: 20 / 360 * 100vw;
}

.logo span {
  font-size: 126 / 360 * 100vw;
  color: #cc3300;
}

.form-item {
  margin-top: 20 / 360 * 100vw;
}

.form-item input {
  width: 100%;
  height: 44 / 360 * 100vw;
  box-sizing: border-box;
  line-height: 44 / 360 * 100vw;
  background: none;
  border: none;
  border-bottom: 1px #999 solid;
  outline: none; // 输入框点击时候没有高亮状态
  font-size: 16px; // 文字大小尽量用像素，因为浏览器最低支持12px
}

.form-item button {
  margin-top: 50 / 360 * 100vw;
  width: 100%;
  height: 48 / 360 * 100vw;
  background: #cc3300;
  color: #fff;
  border-radius: 50px;
  border: none;
  outline: none;
  font-size: 16px;
}
</style>
