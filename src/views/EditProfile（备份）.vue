<template>
  <div class="container">
    <!-- 顶部导航条 引入自定义组件 -->
    <NavigateBar title="编辑资料" />
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL+userInfo.head_img" alt />

      <!-- 添加上传组件 -->
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <!-- 组价的调用,单双标签都可以 -->
    <!-- <Listbar v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips" /> -->
    <!-- 编辑昵称的按钮 -->
    <Listbar label="昵称" :tips="userInfo.nickname" @click.native="show=true" />
    <!-- 编辑昵称的弹窗 -->
    <!-- v-modle:value 和input/change 事件两种数据的集合，这里的v-model作用是控制弹窗是否显示出来 -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="handleChangeNickname">
      <van-field v-model="nickname" placeholder="请输入昵称" />
    </van-dialog>

    <!-- 编辑密码的按钮 -->
    <Listbar label="密码" tips="******" @click.native="showpwd=true" />
    <!-- 编辑密码的弹窗 -->
    <van-dialog v-model="showpwd" title="修改密码" show-cancel-button @confirm="handleChangePassword">
      <van-field v-model="password" placeholder="请输入新密码" type="password" />
    </van-dialog>

    <!-- 编辑性别的按钮 -->
    <Listbar label="性别" :tips="['女','男'][userInfo.gender]" @click.native="showGender=true" />
    <!-- 编辑性别的上拉菜单弹窗 -->
    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      @select="onSelect"
      close-on-click-action
    />
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
      userInfo: {},
      // 本地的用户数据
      userJson: {},
      // 是否显示编辑昵称的弹窗
      show: false,
      // 是否显示修改密码的弹窗
      showpwd: false,
      // 是否显示修改性别的弹窗
      showGender: false,
      // 性别弹窗的选项
      actions: [
        // 对象的数据是可以随意的添加和修改，
        // 因为后台数据表示性别的数字1和0
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ],
      // 单独记录弹出框的昵称
      nickname: "",
      // 单独记录弹窗输入框的密码
      password: "",
      gender: ""
    };
  },

  // 注册列表组件,导入的子组件都必须注册才可以在模板渲染
  components: {
    Listbar,
    NavigateBar
  },
  // 组件加载完成后触发
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    // 保存到data，就可以在methods的方法里面使用了
    this.userJson = userJson;
    // console.log(this.userJson);

    // 请求用户详情
    this.$axios({
      url: "/user/" + userJson.user.id,
      headers: {
        Authorization: this.userJson.token
      }
    }).then(res => {
      const { data } = res.data;
      this.userInfo = data;
      this.nickname = this.userInfo.nickname;
      // console.log(this.userInfo);
    });
  },

  methods: {
    // 图片上传的方法
    afterRead(file) {
      // 创建一个表单对象，上传图片资源必须是表单类型
      const formData = new FormData();
      // 通过原有的方法apeend给表单添加元素
      // 第一个字符串是file表示接口接收的属性，第二个file是文件对象
      formData.append("file", file.file);
      // 此时可以自行将文件上传至服务器
      console.log(file);
      this.$axios({
        url: "/upload",
        // 请求方式
        method: "POST",
        // 添加头信息
        headers: {
          Authorization: this.userJson.token
        },
        data: formData
      }).then(res => {
        console.log(res);
        // url 就是图片的路径
        const { url } = res.data.data;
        // 替换掉当前头像路径
        this.userInfo.head_img = url;
        // 图片上传成功时候调用编辑用户信息的方法
        this.handleEdit({
          head_img: url
        });
      });
    },
    // 封装用户信息的函数
    handleEdit(data) {
      this.$axios({
        url: "/user_update/" + this.userInfo.id,
        method: "post",
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        console.log(res);
        this.$toast.success("修改成功");
      });
    },

    // 修改昵称的事件
    handleChangeNickname() {
      // 调用编辑用户信息的函数
      this.handleEdit({ nickname: this.nickname });
      // 同步修改当前显示的数据
      this.userInfo.nickname = this.nickname;
    },

    // 修改密码的事件
    handleChangePassword() {
      this.handleEdit({ password: this.password });
      // this.userInfo.password = this.password;
    },

    // 选中性别的时候触发的时间，item是选择的当前项
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.handleEdit({ gender: item.value });
      this.userInfo.gender = item.value;
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20/360 * 100vw;
  position: relative;
  img {
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
    left: 50%;
    top: 50%;
    transform: translateX(-50/360 * 100vw) translateY(-50/360 * 100vw);
    opacity: 0;
  }
}
</style>