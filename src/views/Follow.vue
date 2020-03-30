<template>
  <div>
    <!-- 头部组件 -->
    <NavigateBar title="我的关注" />
    <!-- 要循环的结构 -->
    <div class="user-item" v-for="(item,index) in follows " :key="index">
      <img :src="$axios.defaults.baseURL+item.head_img" />
      <div class="user-info">
        <div>{{item.nickname}}</div>
        <!-- 调用处理时间格式的插件 moment -->
        <p>{{moment(item.create_date).format("YYYY-MM-DD hh:mm:ss")}}</p>
      </div>
      <!-- 点击取消，还需要取消当前用的id -->
      <span class="cancel" @click="handleCancel(item.id,index)">取消关注</span>
    </div>
  </div>
</template>

<script>
// 引入头部的导航组件
import NavigateBar from "@/components/NavigateBar";
// 导入处理时间的插件moment
import moment from "moment";
export default {
  data() {
    return {
      // 存放关注列表的数据
      follows: [],
      //   将moment 挂载在data数据里
      moment,
      //   本地用户数据
      localUserJson: {}
    };
  },
  components: {
    NavigateBar
  },
  mounted() {
    //   获取token
    const localUserJson = JSON.parse(localStorage.getItem("userInfo"));
    this.localUserJson = localUserJson;
    //   请求列表数据
    this.$axios({
      url: "/user_follows/",
      headers: {
        Authorization: localUserJson.token
      }
    }).then(res => {
      console.log(res);
      //   data 就是关注的用户列表
      const { data } = res.data;
      this.follows = data;
    });
  },
  methods: {
    handleCancel() {
      // 根据id取消用户关注 -- 弹出确认框
      this.$dialog
        .confirm({
          title: "提示",
          message: "你确定要取消关注吗？"
        })
        .then(() => {
          //点击确定之后触发的函数
          this.$axios({
            url: "/user_unfollow/" + id,
            headers: {
              Authorization: this.localUserJson.token
            }
          }).then(res => {
            this.$toast.success("取消关注成功");
            // 刷新页面的数据
            this.follows.splice(index, 1);
          });
        })
        .catch(() => {
          // 点击取消之后什么都不做
        });
    }
  }
};
</script>

<style lang="less" scoped>
.user-item {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  img {
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    display: block;
    margin-right: 20/360 * 100vw;
    border-radius: 50%;
    // 防止图片变形
    object-fit: cover;
  }
  .user-info {
    flex: 1;
    margin-right: 20/360 * 100vw;
    p {
      font-size: 14px;
      color: #999;
    }
  }
  .cancel {
    padding: 3px 10px;
    font-size: 13px;
    background-color: #ccc;
    border-radius: 10px;
  }
}
</style>