<template>
  <div>
    <!-- 头部组件 -->
    <NavigateBar title="我的跟帖" />
    <!-- 要循环的结构 -->
    <div class="comment-item" v-for="(item,index) in comments" :key="index">
      <div class="date">{{moment(item.create_date).format("YYYY-MM-DD hh:mm:ss")}}</div>
      <!-- 有回复的评论才需要展示 -->
      <div class="parent" v-if="item.parent">
        <div class="parent-user">回复：{{item.parent.user.nickname}}</div>
        <div class="parent-content">{{item.parent.content}}</div>
      </div>

      <!-- 自己发布的内容 -->
      <div class="comment-content">{{item.content}}</div>

      <!-- 回复的文章标题 -->
      <router-link to="#" class="link-post">
        <div>原文：{{item.post.title}}</div>
        <span class="iconfont iconjiantou1"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
// 引入头部的导航组件
import NavigateBar from "@/components/NavigateBar";
import moment from "moment";
export default {
  data() {
    return {
      comments: [],
      moment
    };
  },
  // 注册组件
  components: {
    NavigateBar
  },
  mounted() {
    // 获取本地数据
    const localUserJson = JSON.parse(localStorage.getItem("userInfo"));
    // 请求评论
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: localUserJson.token
      }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.comments = data;
    });
  }
};
</script>

<style lang="less" scoped>
.comment-item {
  padding: 20/360 * 100vw;
  border-bottom: 1px solid #ccc;
  .date {
    color: #999;
    margin-bottom: 15/360 * 100vw;
  }
  .parent {
    padding: 10/360 * 100vw;
    background-color: #eee;
  }
  .comment-content {
    margin: 15/360 * 100vw 0;
  }
  .link-post {
    display: flex;
    position: relative;
    color: #999;
    align-items: center;
    // padding-right: 30px;
    div {
      flex: 1;
      // 文字超出省略号显示
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span {
      margin-left: 5px;
    }
  }
}
</style>