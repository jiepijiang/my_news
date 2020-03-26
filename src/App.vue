<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
// 引入图标库
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
// 导入 Vant 样式
@import url("../node_modules/vant/lib/index.css");

// ----公共样式---
* {
  margin: 0;
  padding: 0;
}
a {
  // 继承父级的颜色
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
}
ul,
li,
ol {
  list-style: none;
}
i,
em {
  font-style: normal;
}
// ----公共样式---
</style>
