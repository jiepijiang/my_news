<template>
  <div>
    <!-- 红色的头部 -->
    <div class="header">
      <!-- logo - new图标 -->
      <span class="iconfont iconnew"></span>
      <!-- 搜索框 -->
      <router-link to="#" class="search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </router-link>
      <!-- 个人中心图标 -->
      <router-link to="/personal">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>

    <!-- tab栏切换 -->
    <!-- v-model：就是当前的索引值，是唯一的，比较类似于for循环的key -->
    <!-- sticky：是否使用粘性定位布局 -->
    <!-- swipeable: 是否开启手势滑动切换 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(item, index) in categories" :key="index" :title="item.name">
        <!-- vant 的列表组件 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            :immediate-check="false"
            v-model="loading"
            :finished="finished"
            finished-text="我也是有底线的"
            @load="onLoad"
          >
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
            <div v-for="(item,index) in categories[active].posts" :key="index" :title="item">
              <!-- 只有单张图片 -->
              <PostItem1
                v-if="item.type===1&&item.cover.length>0&&item.cover.length<3 "
                :data="item"
              />
              <!-- 大于等于3张图片 -->
              <PostItem2 v-if="item.type===1&&item.cover.length>2 " :data="item" />
              <!-- 视频 -->
              <PostItem3 v-if="item.type===2" :data="item" />
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PostItem1 from "@/components/PostItem1";
import PostItem2 from "@/components/PostItem2";
import PostItem3 from "@/components/PostItem3";
export default {
  data() {
    return {
      // 菜单的数据
      categories: [],
      // 记录当前tab的切换的索引
      active: 0,
      // 假设这个数组是后台返回的数据
      // 记录当前栏目的id
      categoryId: 999,
      // list: [],
      loading: false, //是否正在加载中
      finished: false, //是否加载完毕
      refreshing: false //是否正在下拉加载
    };
  },
  // 监听属性
  watch: {
    // 监听tab栏的切换
    active() {
      // 判断如果点击的是最后一个图标，跳转到栏目管理页
      if (this.active === this.categories.length - 1) {
        this.$router.push("/栏目管理");
        return;
      }
      // console.log(this.categories[this.active]);
      // 请求不同的栏目的新闻列表
      this.getList();
    }
  },
  components: {
    PostItem1,
    PostItem2,
    PostItem3
  },
  mounted() {
    // 在请求之前，应该先判断本地有没有栏目的数据
    const categories = JSON.parse(localStorage.getItem("categories"));
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};

    //如果本地有数据，获取本地的数据来渲染，如果没有token，栏目数据的第一项也不是关注，就发起默认请求渲染
    if (categories) {
      // 如果请求回来的数据
      if (categories[0].name !== "关注" && token) {
        this.getCategories(token);
        return;
      }
      if (!token && categories[0].name === "关注") {
        this.getCategories();
        return;
      }
      // 循环给栏目加上一个pageIndex，每个栏目都有自己的pageIndex
      this.categories = categories;
      this.handleCategories();
      // console.log(this.categories);
    } else {
      // 获取栏目数据
      this.getCategories(token);
    }
    // 请求文章列表，页面一开始都是请求头条栏目下的文章，头条栏目的id是999
    this.$axios({
      url: "/post",
      // 这个传递的是动态参数,params
      params: {
        pageIndex: 1,
        pageSize: 5,
        category: this.categoryId
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.categories[this.active].posts = data;
      // 保存到data的list数组里面
      this.categories = [...this.categories];
    });
  },
  methods: {
    //给栏目加上pageIndex
    handleCategories() {
      // 使用循环给栏目加上pageIndex的属性，因为每个栏目都要记录当前页，切换栏目的时候可以记录前一个栏目的页数，返回的时候还是显示那一页
      // 给categories这个对象添加一个记录当前页的属性pageIndex
      this.categories = this.categories.map((item, index) => {
        item.pageIndex = 1;
        item.posts = [];
        item.loading = false;
        item.finished = false;
        return item;
      });
    },
    // 获取栏目数据，如果有token加到头信息，没有就不加 ，封装请求的函数
    getCategories(token) {
      // 没有本地的数据（其实就是检测是否有登录，登录的话就有关注的栏目，没有登录的话就没有关注的栏目），才去获取栏目数据
      const config = {
        url: "/category"
      };
      // 如果有token，就把token添加到头信息中
      // 如果有token请求回来的数据就会有㕑的栏目，代表用户是登录状态
      // 如果没有token就没有关注的栏目，代表用户没有登录
      if (token) {
        config.headers = { Authorization: token };
      }
      this.$axios(config).then(res => {
        // console.log(res);
        const { data } = res.data;
        // 给data添加一个点击跳转到栏目管理的图标
        data.push({
          name: "∨"
        });
        this.categories = data;
        // 把菜单的数据保存到本地
        localStorage.setItem("categories", JSON.stringify(data));
        // 给每一个栏目都加上默认当前页pageIndex=1
        this.handleCategories();
      });
    },

    // 封装一个请求文章列表的方法
    getList() {
      const { pageIndex, id, posts } = this.categories[this.active];
      // 加载下一页的数据
      this.$axios({
        url: "/post",
        params: {
          pageIndex: pageIndex,
          pageSize: 5,
          category: id
        }
      }).then(res => {
        const { data, total } = res.data;
        // 把新的文章数据合并到原来的文章列表中
        this.categories[this.active].posts = [...posts, ...data];
        // 加载状态结束
        this.loading = false;
        // 是否是最后一页
        this.categories = [...this.categories];
        if (this.categories[this.active].posts.length === total) {
          this.finished = true;
        }
        console.log(this.categories);
      });
    },
    // 底部刷新
    onLoad() {
      // 拖动到底部加载时候，让当前pageIndex加1
      this.categories[this.active].pageIndex += 1;
      console.log("已经拖动到了底部");
      this.getList();
    },
    // 下拉刷新
    onRefresh() {
      // 表示加载完毕
      this.refreshing = false;
      console.log("正在下拉刷新");
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 50/360 * 100vw;
  background: #ff0000;
  display: flex;
  padding: 0 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  .iconnew {
    font-size: 20px;
    transform: scale(3);
    position: relative;
    left: 20/360 * 100vw;
  }

  .search {
    flex: 1;
    height: 32/360 * 100vw;
    margin: 0 50/360 * 100vw;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    font-size: 13px;
    line-height: 1;
    vertical-align: middle;

    span {
      margin-right: 5px;
    }
  }

  .iconwode {
    font-size: 20px;
  }
}

// 重置vant组件的样式
// 如果在scoped声明中去修改第三方库的class样式，必须要在前面添加/deep/
/deep/ .van-tabs__nav {
  background: #eee;
}

/deep/ .van-tab {
  flex-basis: 15% !important;
}

/deep/ .van-tab:nth-last-child(2) {
  background: #eee;
  width: 20px !important;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: unset;
}

/deep/ .van-tabs__wrap {
  padding-right: 20px;
}

/deep/ .van-tabs__nav {
  position: static;
}

/deep/ .van-tabs__line {
  display: none;
}

/deep/ .van-tab--active {
  border-bottom: 1px #ff0000 solid;
}
</style>