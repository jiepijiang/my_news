<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <!-- 中间的搜索框 -->
      <div class="search-wrapper">
        <span class="iconfont iconsearch"></span>
        <!-- keyup.enter 是键盘enter触发keyup事件 -->
        <input type="text" placeholder="请输入关键字" v-model="value" @keyup.enter="handleSearch" />
      </div>
      <span @click="handleSearch">搜索</span>
    </div>

    <!-- 历史记录 -->
    <div class="record">
      <div class="title">
        <strong>历史记录</strong>
        <span class="iconfont iconicon-test" @click="handleClear"></span>
      </div>
      <div class="record-list">
        <!-- 历史记录的显示列表 -->
        <span
          class="record-item"
          v-for="(item,index) in history"
          :key="index"
          @click="handleRecord(item)"
        >{{item}}</span>
      </div>
    </div>

    <!-- 搜索結果的浮层 -->
    <div class="result-layer" v-if="showLayer">
      <div v-for="(subItem, subIndex) in list" :key="subIndex">
        <!-- 只有单张图片的 -->
        <PostItem1 :data="subItem" v-if="subItem.type === 1 && subItem.cover.length < 3" />
        <!-- 大于等于3张图片 -->
        <PostItem2 :data="subItem" v-if="subItem.type === 1 && subItem.cover.length >= 3" />
        <!-- 视频 -->
        <PostItem3 :data="subItem" v-if="subItem.type === 2" />
      </div>
      <div class="empty">没有你想要的内容</div>
    </div>
  </div>
</template>

<script>
// 文章列表的组件,只有单张图片的
import PostItem1 from "@/components/PostItem1";
// 大于等于3张图片的组件
import PostItem2 from "@/components/PostItem2";
// 视频的列表组件
import PostItem3 from "@/components/PostItem3";
export default {
  data() {
    return {
      // 输入输入框的值
      value: "",
      history: JSON.parse(localStorage.getItem("history")) || [],
      // 文章列表
      list: [],
      // 是否展示浮层
      showLayer: false
    };
  },
  components: {
    PostItem1,
    PostItem2,
    PostItem3
  },
  watch: {
    // 监听输入框的输入,如果值是空的,清空浮层的内容并隐藏
    value() {
      if (this.value == "") {
        this.list = [];
        this.showLayer = false;
      }
    }
  },
  methods: {
    // 点击搜索或者回车按钮触发的事件
    handleSearch() {
      // 如果关键字是空的,直接返回
      if (this.value == "") {
        return;
      }

      this.history.unshift(this.value);
      // 数组去重
      this.history = [...new Set(this.history)];
      // 把关键词保存到本地
      localStorage.setItem("history", JSON.stringify(this.history));
      // 调用接口开始搜索
      this.getList();
    },
    // 清除本地的搜索记录
    handleClear() {
      this.history = [];
      localStorage.removeItem("history");
    },
    // 关键字搜索
    handleRecord(item) {
      this.value = item;
      this.getList();
    },
    // 调用接口发起搜索
    getList() {
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.value
        }
      }).then(res => {
        console.log(res);
        this.showLayer = true;
        const { data } = res.data;
        // 将请求回来的关键词数据保存到list中
        this.list = data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  padding: 10 / 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search-wrapper {
    flex: 1;
    margin: 0 20/360 * 100vw;
    border: 1px #ccc solid;
    height: 38/360 * 100vw;
    padding: 0 10/360 * 100vw;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 0;
    border-radius: 50px;
    box-sizing: border-box;
  }
  input {
    border: none;
    background: none;
    margin-left: 5px;
  }
}

.record {
  margin-top: 10/360 * 100vw;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20/360 * 100vw;
    margin-bottom: 10/360 * 100vw;
  }

  .record-list {
    padding: 0 10/360 * 100vw;
    display: flex;
    flex-wrap: wrap;

    .record-item {
      padding: 5px 10/360 * 100vw;
      border: 1px #ccc solid;
      font-size: 14px;
      margin: 5/360 * 100vw 10/360 * 100vw;
    }
  }
}

.result-layer {
  position: absolute;
  top: 58/360 * 100vw;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  overflow-y: auto;
  padding: 20/360 * 100vw;
  box-sizing: border-box;
  .result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10/360 * 100vw 0;
    border-bottom: 1px #eee solid;
    p {
      flex: 1;
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span {
      color: #999;
    }
  }
  .empty {
    text-align: center;
    color: #ccc;
  }
}
</style>