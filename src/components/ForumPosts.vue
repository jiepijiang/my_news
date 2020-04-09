<template>
  <!-- 底部评论收藏分享 -->
  <div class="footer">
    <!-- 写跟帖 -->
    <router-link :to="`/post_comment/${post.id}`" class="comment-input">发表评论</router-link>
    <!-- 评论图标 -->
    <div class="icons">
      <span class="iconfont icon-pinglun"></span>
      <i>{{post.comment_length>100?'99+':post.comment_length}}</i>
    </div>
    <!-- 收藏图标 -->
    <div class="icons" @click="handleStar">
      <span class="iconfont icon-shoucang" :class="post.has_star?'active':'' "></span>
    </div>
    <!-- 分享图标 -->
    <div class="icons">
      <span class="iconfont icon-tubiao212"></span>
    </div>
  </div>
</template>

<script>
export default {
  // post 文章详情事件
  props: ["post"],
  methods: {
    // 收藏和取消收藏
    handleStar() {
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
      this.$axios({
        url: "/post_star/" + this.post.user.id,
        headers: {
          Authorization: token
        }
      }).then(res => {
        // 修改收藏的状态 -- 有可能会报错,因为是修改了父组件的属性
        this.post.has_star = !this.post.has_star;
        // 弹窗提示
        this.$toast.success(res.data.message);
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
</style>