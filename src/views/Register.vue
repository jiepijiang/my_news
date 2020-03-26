<template>
  <div class="container">
    <!-- 左上角的小叉叉 -->
    <div class="back-btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- 正中间的 NEW图标 -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 使用 vant ui 组件的输入框 -->
    <!-- van-form是表单的组件,@submit是表单按钮提交的事件 -->
    <van-form @submit="onSubmit" class="form">
      <!-- rules 是表单字段的规则 ,required 表示这个输入框是必填的-->
      <van-field
        v-model="form.username"
        name="用户名 / 手机号码"
        placeholder="用户名 / 手机号码"
        :rules="[{ required: true, message: '请填写用户名 / 手机号码' }]"
      />
      <!-- 昵称输入框 -->
      <van-field
        v-model="form.nickname"
        name="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <!-- 密码框 -->
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div>
        <!-- 如果这个按钮是在van-form组件内部,并且按钮的native-type="submit",说明点击这个按钮就会触发sumbit事件 -->
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      // 调用 axios 发起异步请求,类似 $.ajax
      this.$axios({
        // 请求地址
        url: "/register",
        // 请求方式
        method: "POST",
        // 参数
        data: this.form
        //  .then 里面的函数就是 请求成功 后的 回调函数
      }).then(res => {
        console.log(res);
        // 获取成功返回的信息
        const { message } = res.data;
        // console.log(message);
        this.$toast.success(message);
      });
    }
  }
};
</script>

<style lang="less" scoped>
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

// 修改vant ui 库的样式
.form {
  .van-cell {
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 20/360 * 100vw;
  }
  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #333;
    left: 0;
  }
  .van-button--info {
    margin-top: 50/360 * 100vw;
    background-color: #cc3300;
    border: 1px solid #cc3300;
  }
}
</style>
