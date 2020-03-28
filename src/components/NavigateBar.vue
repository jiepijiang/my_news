<template>
  <!-- 顶部的导航条 -->
  <div class="navigate-bar">
    <span class="iconfont iconjiantou2" @click="$router.back()"></span>
    <strong>{{title}}</strong>
    <span class="iconfont iconshouye" @click="$router.push('/')" v-if="showHome"></span>
    <!-- v-else指令是必须要接着v-if后面使用的 -->
    <span v-else class="iconfont iconshouye" style="opacity:0"></span>
  </div>
</template>

<script>
export default {
  // 组件传值,展示的文字和是否展示首页的图标
  // showHome是布尔值,如果传入的是true,就显示,如果是false就隐藏主页图标
  props: ["title", "showHome"]
};
</script>

<style lang="less">
.navigate-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 48/360 * 100vw;
  padding: 0 20/360 * 100vw;
  border-bottom: 1px #eee solid;
}
</style>