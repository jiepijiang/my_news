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
      userInfo: {},
      // 本地的用户数据
      userJson: {}
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
    // 保存到data，就可以在methods的方法里面使用了
    this.userJson = userJson;
    // 请求用户详情
    this.$axios({
      url: "/user/" + userJson.user.id,
      headers: {
        Authorization: this.userJson.token
      }
    }).then(res => {
      const { data } = res.data;
      this.userInfo = data;
    });
  },

  methods: {
    // 图片上传的方法
    afterRead(file) {
      // 创建一个表单对象，上传图片资源必须是表单类型
      const formData = new FormData();
      // 通过原有的方法apeend给表单添加元素
      // 第一个字符串是file表示接口接收的属性，第二个file是文件对象
      formData.append("file", file.file);
      // 此时可以自行将文件上传至服务器
      console.log(file);
      this.$axios({
        url: "/upload",
        // 请求方式
        method: "POST",
        // 添加头信息
        headers: {
          Authorization: this.userJson.token
        },
        data: formData
      }).then(res => {
        console.log(res);
        // url 就是图片的路径
        const { url } = res.data.data;
        // 替换掉当前头像路径
        this.userInfo.head_img = url;
        // 图片上传成功时候调用编辑用户信息的方法
        this.handleEdit({
          head_img: url
        });
      });
    },
    // 封装用户信息的函数
    handleEdit(data) {
      this.$axios({
        url: "/user_update/" + this.userInfo.id,
        method: "post",
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        console.log(res);
        this.$toast.success("头像修改好了");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20/360 * 100vw;
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