<template>
  <!-- 列表栏 -->
  <div class="listbar">
    <router-link :to="path||'#'">
      <div>{{label}}</div>
      <div class="tips">
        {{tips}}
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  // 动态属性,添加之后才能使用插值表达式
  props: ["label", "tips", "path"]
};
</script>

<style lang="less" scoped>
// 列表按钮栏的样式
.listbar {
  padding-left: 20/360 * 100vw;
  height: 48/360 * 100vw;
  line-height: 48/360 * 100vw;
  /deep/a {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    align-items: center;
    padding-right: 5px;
  }
  .tips {
    color: #999;
    font-size: 13px;
    span {
      margin-left: 5px;
    }
  }
}
</style>