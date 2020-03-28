<template>
  <div class="container">
    <!-- 顶部导航条 引入自定义组件 -->
    <NavigateBar title="编辑资料" />
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL+userInfo.head_img" alt />

      <!-- 添加上传组件 -->
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <!-- 组价的调用,单双标签都可以 -->
    <!-- <Listbar v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips" /> -->
    <Listbar label="昵称" :tips="userInfo.nickname" />
    <Listbar label="密码" tips="******" />
    <Listbar label="性别" :tips="['女','男'][userInfo.gender]" />
  </div>
</template>

<script>
// 导入列表按钮栏的组件
import Listbar from "@/components/Listbar";
// 引入头部的导航组件
import NavigateBar from "@/components/NavigateBar";
export default {
  data() {
    return {
      // rows: [
      //   { label: "昵称", tips: this.userInfo.user.nickname },
      //   { label: "密码", tips: "*******" },
      //   { label: "性别", tips: this.userInfo.user.gender }
      // ],
      userInfo: {
        // user: {}
      }
    };
  },

  // 注册列表组件,导入的子组件都必须注册才可以在模板渲染
  components: {
    Listbar,
    NavigateBar
  },
  // 组件加载完成后触发
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    // 请求用户详情
    this.$axios({
      url: "/user/" + userJson.user.id,
      // 添加头信息
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      const { data } = res.data;
      this.userInfo = data;
    });
  },

  methods: {
    // 图片上传的方法
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  position: relative;
  img {
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
    left: 50%;
    top: 50%;
    transform: translateX(-50/360 * 100vw) translateY(-50/360 * 100vw);
    opacity: 0;
  }
}
</style>