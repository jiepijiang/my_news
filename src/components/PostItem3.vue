<template>
  <router-link :to="`/video/${data.id}`" class="video">
    <h4>{{data.title}}</h4>
    <div class="cover">
      <!-- 封面图片 -->
      <img :src="$axios.defaults.baseURL+data.cover[0].url" />
      <!-- 图片上的按钮 -->
      <div class="cover-layer">
        <span class="iconfont iconshipin"></span>
      </div>
    </div>
    <p>{{data.user.nickname}} {{data.comment_length}}跟帖</p>
  </router-link>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="less" scoped>
.video {
  display: block;
  padding: 20/360 * 100vw;
  border-bottom: 1px #eee solid;
  h4 {
    // 文字超出两行出现省略号
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: normal;
  }
  .cover {
    width: 100%;
    height: 170/360 * 100vw;
    position: relative;
    margin: 20/360px * 100vw 0;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cover-layer {
      width: 55/360 * 100vw;
      height: 55/360 * 100vw;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-27/300 * 100vw) translateY(-27/300 * 100vw);
      display: flex;
      justify-content: center;
      align-items: center;
      .iconshipin {
        color: #fff;
        font-size: 32px;
      }
    }
  }
  p {
    color: #999;
    margin-top: 5px;
  }
}
</style>