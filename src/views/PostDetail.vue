<template>
  <div class="container">
    <div class="main">
      <!-- 头部 -->
      <div class="header">
        <div class="left">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <!-- active表示红色 ,文字要变成关注 -->
        <div class="right" @click="handleFollow">
          <span :class="post.has_follow?'':'active'">{{post.has_follow?'已关注':'关注+'}}</span>
        </div>
      </div>

      <!-- 正文部分 -->
      <h3 class="title">{{post.title}}</h3>
      <div
        class="author"
      >{{post.user.nickname}} {{moment(post.create_date).format("YYYY-MM-DD hh:mm:ss")}}</div>
      <p class="content" v-html="post.content"></p>

      <!-- 正文下面的按钮 点赞和微信分享按钮-->
      <div class="actions">
        <div class="actions-item" @click="handleLike">
          <span class="iconfont icondianzan"></span>
          <i v-if="post.has_like">{{Number(post.like_length)}}</i>
          <i v-if="!post.has_like">0</i>
        </div>
        <div class="actions-item">
          <span class="iconfont icon-weixin"></span>
          <i>微信</i>
        </div>
      </div>
    </div>

    <!-- 底部评论收藏分享组件-->
    <ForumPosts :post="post" />
  </div>
</template>

<script>
// 导入处理时间的插件moment
import moment from "moment";
// 导入跟帖模块
import ForumPosts from "@/components/ForumPosts.vue";

export default {
  data() {
    return {
      post: {
        //   为什么要加user对象,因为当请求的数据需要时间,post还是一个空对象,所以在渲染数据的时候想要拿到空对象里面的对象是会报错的,加个默认值就不会报错了
        user: {}
      },
      moment,
      token: ""
    };
  },
  components: {
    ForumPosts
  },
  mounted() {
    //   获取文章id
    const { id } = this.$route.params;
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    // 保存一份到data
    this.token = token;
    // 如果token有值就给头信息加上token
    const config = {
      // this.$route.params 获取动态参数id
      url: "/post/" + id
    };
    // 如果有token有值,加入config
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    this.$axios(config).then(res => {
      //   将数据解构出来
      const { data } = res.data;

      // 替换文字内容里面的本地路径，把localhost:3000替换成基准路径，
      // “这个功能只对使用线上接口的同学有效果”，如果使用的是本地的后台，不替换也可以
      data.content = data.content.replace(
        /http:\/\/localhost:3000/gi,
        this.$axios.defaults.baseURL
      );
      this.post = data;
    });
  },
  methods: {
    //   关注和取消关注的按钮点击触发的函数
    handleFollow() {
      // 先判断当前状态是关注还是未关注
      let url = "";
      if (this.post.has_follow) {
        // 如果是关注,就实现取消关注的功能
        url = "/user_unfollow/" + this.post.user.id;
      } else {
        url = "/user_follows/" + this.post.user.id;
      }
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
      //   这里是关注和取消关注的axios请求
      this.$axios({
        url,
        headers: {
          Authorization: token
        }
      }).then(res => {
        this.post.has_follow = !this.post.has_follow;
        this.$toast.success(this.post.has_follow ? "关注成功" : "取消关注成功");
      });
    },

    // 点赞和取消点赞
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.post.user.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // 修改点赞的状态
        this.post.has_like = !this.post.has_like;
        if (this.post.has_like) {
          // 点赞数量加一
          this.post.like_length += 1;
        } else {
          this.post.like_length -= 1;
        }
        // 弹窗提示
        this.$toast.success(res.data.message);
      });
    },

    // 收藏和取消收藏
    handleStar() {
      this.$axios({
        url: "/post_star/" + this.post.user.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // 修改收藏的状态
        this.post.has_star = !this.post.has_star;
        // 弹窗提示
        this.$toast.success(res.data.message);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .main {
    padding: 0 20/360 * 100vw;
    padding-bottom: 100/360 * 100vw;
    border-bottom: 5px #eee solid;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 54/360 * 100vw;
      .left {
        .iconnew {
          // font-size: 13px;
          display: inline-block;
          transform: scale(3.5);
          margin-left: 30/360 * 100vw;
        }
      }
      .right {
        span {
          display: inline-block;
          text-align: center;
          line-height: 26/360 * 100vw;
          border: 1px solid #ccc;
          border-radius: 13/360 * 100vw;
          width: 62/360 * 100vw;
          height: 26/360 * 100vw;
          font-size: 12px;
        }
      }
      .active {
        background-color: red;
        // border: 1px solid red;
        color: #fff;
        border-radius: 13/360 * 100vw;
      }
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .author {
      font-size: 12px;
      color: #999;
      margin-bottom: 20/360 * 100vw;
    }
    .content {
      font-size: 13px;
      line-height: 2;
      /deep/ img {
        max-width: 100%;
      }
    }
    // 点赞和微信的样式
    .actions {
      display: flex;
      justify-content: center;
      align-items: center;
      .active {
        color: red;
      }
      .actions-item {
        width: 70/360 * 100vw;
        height: 29/360 * 100vw;
        border: 1px solid #ccc;
        line-height: 29/360 * 100vw;
        text-align: center;
        border-radius: 15/360 * 100vw;
        margin: 30/360 * 100vw;
        .icondianzan {
          transform: scale(0.8);
        }
        .icon-weixin {
          color: green;
        }
        i {
          margin-left: 2px;
        }
      }
    }
  }
  // 底部的样式
  .footer {
    position: fixed;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    display: flex;
    padding: 0 20/360 * 100vw;
    box-sizing: border-box;
    margin: 10/360 * 100vw 0;
    .comment-input {
      width: 180/360 * 100vw;
      height: 30/360 * 100vw;
      background: #ccc;
      line-height: 30/360 * 100vw;
      text-indent: 2em;
      border-radius: 15/360 * 100vw;
      margin-right: 10/360 * 100vw;
    }
    .icons {
      position: relative;
      width: 22/360 * 100vw;
      height: 22/360 * 100vw;
      margin: 0 10/360 * 100vw;
      i {
        position: absolute;
        right: 0px;
        top: -4px;
        display: block;
        padding: 1px 2px;
        background: red;
        color: #fff;
        font-size: 10px;
        line-height: 1;
        border-radius: 50px;
      }
    }
    .active {
      color: red;
    }
  }
}
</style>