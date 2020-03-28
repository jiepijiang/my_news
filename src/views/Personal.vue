<template>
  <div class="container">
    <!-- 引入自定义头部组件 -->
    <!-- showHome 是显示主页图标的  -->
    <NavigateBar title="个人中心" showHome="true" />
    <!-- 头部 -->
    <router-link to="/edit-profile">
      <div class="header">
        <!-- 头像 -->
        <div class="avatar">
          <!-- $axios.defaults.baseURL 就是后台的基准地址 -->
          <img :src="$axios.defaults.baseURL+userInfo.head_img" alt />
        </div>
        <!-- 姓名 -->
        <div class="profile">
          <div>
            <!-- 性别男 图标 -->
            <span class="iconfont iconxingbienan" v-if="userInfo.gender===1"></span>
            <!-- 性别女 图标 -->
            <span class="iconfont iconxingbienv" v-if="userInfo.gender===0"></span>
            {{userInfo.nickname}}
          </div>
          <p>{{moment(userInfo.create_date).format('YYYY-MM-DD')}}</p>
        </div>
        <!-- 右侧的箭头图标 -->
        <span class="arrow iconfont iconjiantou1"></span>
      </div>
    </router-link>

    <!-- 组价的调用,单双标签都可以 -->
    <Listbar v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips" />

    <!-- 点击按钮时触发 -->
    <!-- @click.native 这个是一个事件类型,会给listbar这组件最外部的div强制绑定点击事件 -->
    <Listbar label="退出" @click.native="handleClick" />
  </div>
</template>

<script>
// 导入列表按钮栏的组件
import Listbar from "@/components/Listbar";
// 引入头部的导航组件
import NavigateBar from "@/components/NavigateBar";
import moment from "moment";
export default {
  data() {
    return {
      rows: [
        { label: "我的关注", tips: "关注的用户" },
        { label: "我的跟帖", tips: "跟帖回复" },
        { label: "我的收藏", tips: "文章视频" }
      ],
      // 个人详细信息
      userInfo: {},
      // moment 是日期处理的工具库,为了在模板中可以使用,所以需要绑定在data中
      moment
    };
  },
  // 注册列表组件,导入的子组件都必须注册才可以在模板渲染
  components: {
    Listbar,
    NavigateBar
  },
  // 组件加载完毕后触发
  mounted() {
    // 从本地获取token和id,并且转换成对象
    // useJson.token 和 useJson.user.id 这两个值是接口需要的
    const useJson = JSON.parse(localStorage.getItem("userInfo"));
    // 发起异步的 axios 请求
    this.$axios({
      url: "/user/" + useJson.user.id,
      // 添加头信息
      headers: {
        Authorization: useJson.token
      },
      methods: "GET"
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.userInfo = data;
    });
  },

  methods: {
    handleClick() {
      // this.$emit("click");
      // 询问用户是否确定退出
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定退出吗?"
        })
        .then(() => {
          // 点击确定时候触发的函数
          localStorage.removeItem("userInfo");
          // 跳转到登录页,必须使用replace,因为退出不可能再返回个人中心
          this.$router.replace("/login");
        })
        .catch(() => {
          // 点击取消按钮触发的函数
        });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid #eee;
  .avatar {
    img {
      display: block;
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      // 使图片不变形
      object-fit: contain;
    }
  }
  .profile {
    flex: 1;
    padding-left: 20/360 * 100vw;
    line-height: 1.5;
    p {
      color: #999;
    }
    .iconxingbienan {
      color: skyblue;
    }
    .iconxingbienv {
      color: hotpink;
    }
  }
}
</style>