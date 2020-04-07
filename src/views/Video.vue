<template>
  <div>
    <!-- 视频 -->
    <video
      v-if="post.content"
      :poster="$axios.defaults.baseURL+post.cover[0].url"
      :src="$axios.defaults.baseURL+post.content"
      controls
      class="video"
    >你的浏览器版本过低,无法正常播放</video>
    <div class="main">
      <!-- 用户信息和关注按钮 -->
      <div class="author">
        <div class="userInfo">
          <img :src="$axios.defaults.baseURL+post.user.head_img" alt />
          <span>{{post.user.nickname}}</span>
        </div>
        <!-- 关注按钮 : active表示红色 ,文字要变成关注 -->
        <div class="right">
          <!-- 如果关注是false，就加上active这个class，显示一个红色按钮 -->
          <span
            class="follow"
            :class="post.has_follow ? '' : 'active'"
            @click="handleFollow"
          >{{ post.has_follow ? '已关注' : '关注' }}</span>
        </div>
      </div>
      <!-- 视频标题 -->
      <div class="title">{{post.title}}</div>

      <!-- 正文下面的按钮 点赞和微信分享按钮-->
      <div class="actions">
        <div class="actions-item" @click="handleLike">
          <span class="iconfont icondianzan"></span>
          <i>{{Number(post.like_length)}}</i>
        </div>
        <div class="actions-item">
          <span class="iconfont icon-weixin"></span>
          <i>微信</i>
        </div>
      </div>
    </div>

    <!-- 底部跟帖组件 -->
    <ForumPosts :post="post" />
  </div>
</template>

<script>
import ForumPosts from "@/components/ForumPosts.vue";
export default {
  data() {
    return {
      post: {
        user: {},
        cover: [{}]
      },
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
      this.post = data;
      console.log(this.post);
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
.video {
  max-width: 100%;
}
.main {
  padding: 20/360 * 100vw;
  .author {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .userInfo {
      img {
        width: 25/360 * 100vw;
        height: 25/360 * 100vw;
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
  .title {
    font-size: 16px;
    margin: 10/360 * 100vw 0;
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
  .active {
    background-color: red;
    color: #fff;
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
</style>