// 1.在views文件夹创建一个登录页,大组件放在views,小组件放在components  快速生成模板 shift + < 

// 2.配置路由
<template>
  <div class='login'>
    <!-- 要显示阿里图标库的图标,必须要加上iconfont这个类名,第二类名就是你想要显示的那个图标-->
    <!-- 灰色的头部部分 -->
    <div class="top"></div>
    <!-- 左上角的小叉叉 -->
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- 正中间的 NEW图标 -->
    <div class="new">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 用户名 -->
    <div class="username">
      <input type="text" placeholder="用户名 / 手机号码"/>
    </div>
    <!-- 密码 -->
    <div class="password">
      <input type="password" placeholder="密码">
    </div>
    <!-- 登录按钮 -->
    <div class="loginBtn">
      <button>登录</button>
    </div>

  </div>
  
</template>

<script>
export default {};
</script>

<style lang="less">
// 最大的login盒子
.login {
  width: 360px;
  height: 635px;
  background-color: #f2f2f2;
  // padding: 5px;
  box-sizing: border-box;
  // 先跟浏览器有一段距离,以便观察
  margin: 100px;
  // 顶部的灰色部分
  .top {
    height: 24px;
    background-color: #757575;
  }
  // 左上角的XX
  .close {
    margin: 20px;
    .iconicon-test {
      font-size: 27px;
      color: #757575;
      font-weight: bolder;
    }
  }
  // 中间的 new
  .new {
    text-align: center;
    .iconnew {
      font-size: 127px;
      color: #cc3300;
    }
  }
  // 输入框
  .username,
  .password {
    margin: 20px;
    display: flex;
    input {
      width: 100%;
      border: none;
      background-color: #f2f2f2;
      font-family: "Arial Normal", "Arial";
      font-weight: 400;
      margin: 10px 0;
      font-size: 18px;
      outline: none;
    }
  }
  .username {
    border-bottom: 1px solid #757575;
  }
  // 登录按钮
  .loginBtn {
    display: flex;
    margin: 50px 20px;
    button {
      border: none;
      width: 100%;
      background-color: #cc3300;
      height: 48px;
      color: #ffffff;
      font-size: 18px;
      border-radius: 24px;
    }
  }
}
</style>
