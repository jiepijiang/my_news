<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
// 引入图标库 -- 这个是老师的图标库
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
// 这个是我的阿里图标库
@import url("//at.alicdn.com/t/font_1736846_lmiybudfnr.css");
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

body,
ul,
li,
h1,
h2,
h3,
h4,
h5,
h6,
p,
form,
dl,
dt,
dd {
  margin: 0px;
  padding: 0px;
  font-size: 12px;
  font-weight: normal;
}
// ----公共样式---
// 加一层灰色滤镜
// #app {
//   -webkit-filter: grayscale(1);
// }
</style>
