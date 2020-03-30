<template>
  <div>
    <!-- 头部组件 -->
    <NavigateBar title="我的收藏" />

    <div v-for="(item,index) in stars" :key="index">
      <!-- 循环的结构，少于3张图片的布局-->
      <div class="star-item imgText" v-if="item.cover.length<3&&item.cover.length>0">
        <div class="imgText-left">
          <h4>{{item.title}}</h4>
          <p>
            {{item.user.nickname}}
            <span>{{item.comments.length}}跟帖</span>
          </p>
        </div>
        <img :src="$axios.defaults.baseURL+item.cover[0].url" />
        <div class="imgText-right"></div>
      </div>

      <!-- 循环的结构，大于三张图片的布局 -->
      <div class="imgList" v-if="item.cover.lenght>3">
        <h4>标题标题标题标题</h4>
        <div class="images">
          <img
            src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=943737565,604373982&fm=111&gp=0.jpg"
          />
          <img
            src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=943737565,604373982&fm=111&gp=0.jpg"
          />
          <img
            src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=943737565,604373982&fm=111&gp=0.jpg"
          />
        </div>
        <p>
          火星时报
          <span>99+跟帖</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// 引入头部的导航组件
import NavigateBar from "@/components/NavigateBar";
export default {
  data() {
    return {
      stars: []
    };
  },
  components: {
    NavigateBar
  },
  mounted() {
    // 获取本地数据
    const localUserJson = JSON.parse(localStorage.getItem("userInfo"));
    //   请求我的收藏数据
    this.$axios({
      url: "/user_star",
      headers: {
        Authorization: localUserJson.token
      }
    }).then(res => {
      console.log(res);
      //   我的收藏文章列表
      const { data } = res.data;
      this.stars = data;
    });
  }
};
</script>

<style lang="less" scoped>
// 第一种布局的样式
.imgText {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  .imgText-left {
    flex: 1;
    h4 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: normal;
      font-size: 14px;
    }
    p {
      color: #999;
      margin-top: 5px;
    }
  }
  img {
    width: 110/360 * 100vw;
    height: 75/360 * 100vw;
    display: block;
    object-fit: cover;
    margin-left: 10/360 * 100vw;
    // 防止图片在flex布局下被挤压
    flex-shrink: 0;
  }
}
// 第二种布局的样式
.imgList {
  padding: 20/360 * 100vw;
  border-bottom: 1px solid #eeeeee;
  h4 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: normal;
    font-size: 14px;
  }
  .images {
    margin: 20/360 * 100vw 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 33%;
      height: 75/360 * 100vw;
      object-fit: cover;
      flex-shrink: 0;
    }
  }
  p {
    color: #999;
    margin-top: 5px;
  }
}
</style>