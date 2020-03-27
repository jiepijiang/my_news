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
    <!-- 自己写的表单 -->
    <!-- <div class="form">
      <div class="form-item">
        <input type="text" placeholder="用户名 / 手机号码" v-model="form.username"/>
      </div>
      <div class="form-item">
        <input type="password" placeholder="密码" v-model="form.password">
      </div>
      <div class="form-item">
        <button @click="handleClick()">登录</button>
      </div>
    </div> -->

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
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div>
        <!-- 如果这个按钮是在van-form组件内部,并且按钮的native-type="submit",说明点击这个按钮就会触发sumbit事件 -->
        <van-button round block type="info" native-type="submit">
            登录
        </van-button>
      </div>
    </van-form>
    <!-- 注册按钮 -->
    <router-link to="/register">
        <van-button round block>
          注册
        </van-button>
    </router-link>

  </div>
  
</template>

<script>
export default {
  data() {
    return {
      // // 保存表单数据
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 自己写的表单事件
    // handleClick() {
    //   // 轻提示 -- test
    //   // this.$toast("登录成功!");
    //   // 调用 axios 发起异步请求,类似 $.ajax
    //   this.$axios({
    //     // 请求地址
    //     url: "http://127.0.0.1:3000/login",
    //     // 请求方式
    //     method: "POST",
    //     // 参数
    //     data: this.form
    //     //  .then 里面的函数就是 请求成功 后的 回调函数
    //   }).then(res => {
    //     console.log(res);
    //     // 获取成功返回的信息
    //     const { message } = res.data;
    //     // console.log(this);
    //     this.$toast.success(message);
    //   });
    // },

    // 这里是使用 vant ui库里的事件
    // 提交表单的时候触发的事件,该事件通过校验才会触发
    // values 表示表单返回的值,这里的values我们用不上,因为是登录,数据可以在this.form里面拿
    onSubmit(values) {
      console.log("submit", values);
      // 调用 axios 发起异步请求,类似 $.ajax
      this.$axios({
        // 请求地址
        url: "/login",
        // 请求方式
        method: "POST",
        // 参数
        data: this.form
        //  .then 里面的函数就是 请求成功 后的 回调函数
      }).then(res => {
        // console.log(res);
        // 获取成功返回的信息
        const { message, data } = res.data;
        // console.log(message);
        // 使用vant弹窗提示,success表示成功的弹窗
        this.$toast.success(message);
        localStorage.setItem("userInfo", JSON.stringify(data));
        this.$router.push("/personal");
      });
    }
  }
};
</script>

<style lang="less" scoped>
// scoped属性表示样式只针对当前的组件有效
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

// .form-item {
//   margin-top: 20 / 360 * 100vw;
// }

// .form-item input {
//   width: 100%;
//   height: 44 / 360 * 100vw;
//   box-sizing: border-box;
//   line-height: 44 / 360 * 100vw;
//   background: none;
//   border: none;
//   border-bottom: 1px #999 solid;
//   outline: none; // 输入框点击时候没有高亮状态
//   font-size: 16px; // 文字大小尽量用像素，因为浏览器最低支持12px
// }

// .form-item button {
//   margin-top: 50 / 360 * 100vw;
//   width: 100%;
//   height: 48 / 360 * 100vw;
//   background: #cc3300;
//   color: #fff;
//   border-radius: 50px;
//   border: none;
//   outline: none;
//   font-size: 16px;
// }

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
