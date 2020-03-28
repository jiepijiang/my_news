<template>
  <div class="container">
    <!-- 顶部导航条 引入自定义组件 -->
    <NavigateBar title="编辑资料"/>
    <!-- 头像 -->
    <div class="avatar">
      <img src="http://img1.imgtn.bdimg.com/it/u=303447393,311038390&fm=11&gp=0.jpg" alt />
    </div>
    <!-- 组价的调用,单双标签都可以 -->
    <Listbar v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips" />
  </div>
</template>

<script>
// 导入列表按钮栏的组件
import Listbar from "@/components/Listbar";
// 引入头部的导航组件
import NavigateBar from "@/components/NavigateBar";
export default {
  
  data() {
    return {
      rows: [
        { label: "昵称", tips: "火星网友" },
        { label: "密码", tips: "*******" },
        { label: "性别", tips: "男" }
      ]
    };
  },

  // 注册列表组件,导入的子组件都必须注册才可以在模板渲染
  components: {
    Listbar,
    NavigateBar
  }
};
</script>

<style lang="less" scoped> 
.avatar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  img {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    border-radius: 50%;
  }
}
</style>