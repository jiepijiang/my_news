<template>
  <div class="container">
    <!-- 头部导航组件 -->
    <NavigateBar title="精彩跟帖" />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- 跟帖评论列表,评论的最外层,第一级 -->
      <div class="comment" v-for="(item,index) in list" style="margin:15px">
        <div class="comment-top">
          <div class="user">
            <img :src="$axios.defaults.baseURL+item.user.head_img" alt />
            <div class="user-info">
              <p>{{item.user.nickname}}</p>
              <span>{{moment(item.create_date).fromNow()}}</span>
            </div>
          </div>
          <span class="reply" @click="handleReply(item)">回复</span>
        </div>
        <!-- 回复列表调用的组件 -->
        <CommentFloor v-if="item.parent" :data="item.parent" @reply="handleReply" />
        <div class="content">{{item.content}}</div>
      </div>
    </van-list>

    <!-- 发布评论的底部 -->
    <div class="publish">
      <!-- 输入框，点击和没点击时候显示的效果是不一样的 -->
      <!-- 如果输入框获得焦点的话：
            1.需要显示出发布按钮，
            2.需要去掉输入框的自适应高度，
      3.需要添加active这个class-->
      <van-field
        v-model="message"
        :rows="rows"
        :autosize="!isFocus"
        type="textarea"
        :placeholder="reply.user?`回复:@${reply.user.nickname}`:`说点什么呢...`"
        class="textarea"
        :class="isFocus ? `ative` : ``"
        @focus="handleFocus"
        @blur="handleBlur"
        ref="textarea"
      />
      <span class="submit" v-if="isFocus" @click="handleSubimit">发布</span>
    </div>
  </div>
</template>

<script>
// 头部导航组件
import NavigateBar from "@/components/NavigateBar";
// 回复的评论楼层组件
import CommentFloor from "@/components/CommentFloor";
// 日期转换工具库
import moment from "moment";
// 转换国际语言，zh-CN就是中文（en 就是默认的英文）
moment.locale("zh-CN");
export default {
  components: {
    NavigateBar,
    CommentFloor
  },
  data() {
    return {
      // 保存文章的id
      pid: "",
      //   保存文章的数据
      list: [],
      moment,
      //   是否正在加载中
      loading: false,
      //   数据是否加载完毕
      finished: false,
      //   页数
      pageIndex: 1,
      //   分页数
      pageSize: 10,
      //   发布评论的数据
      message: "",
      //   发布评论输入框的行数
      rows: 1,
      // 几率当前的输入框是否获得焦点
      isFocus: false,
      // 记录回复评论的整个对象
      reply: {},
      // 是否正在加载
      isload: false
    };
  },
  mounted() {
    //   获取文章id将文章id从地址栏中解构出来
    const { id } = this.$route.params;
    // 把id保存在data 的 pid 中
    this.pid = id;
    this.getCommentList();
  },
  methods: {
    //   封装请求评论数据的函数
    getCommentList() {
      if (this.isload) {
        return;
      }
      this.isload = true;
      this.$axios({
        url: `/post_comment/${this.pid}`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        // 将res中返回的数据data里面的data解构出来，保存到list
        // 保存到data的list
        this.list = [...this.list, ...data];
        // 请求完成后页数加一
        this.pageIndex += 1;
        // 初始化分页相关的值,告诉 van-list组件请求完毕
        this.loading = false;
        // 数据加载完毕
        if (data.length < this.pageSize) {
          this.finished = true;
        }
        // 表示这次已经加载完毕
        this.isload = false;
      });
    },

    // 滚动到底部触发的事件
    onLoad() {
      this.getCommentList();
      console.log(123);
    },
    // 评论输入框获得焦点时候触发的事件
    handleFocus() {
      // 修改评论输入框的高度
      this.isFocus = true;
    },
    // 评论输入框失去焦点时候触发
    handleBlur() {
      setTimeout(() => {
        this.isFocus = false;
        if (this.message.trim == "") {
          this.reply = {};
        }
      }, 300);
    },
    // 发布评论
    handleSubimit() {
      // console.log(this.message);
      if (this.message == "") return;
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};

      // 评论接口的参数
      const data = {
        content: this.message
      };

      // 如果reply有值,说明当前有回复的人存在
      if (this.reply.id) {
        // parent_id 就是回复的用户id
        data.parent_id = this.reply.id;
      }
      // 发布评论的请求
      this.$axios({
        url: "/post_comment/" + this.pid,
        method: "POST",
        headers: {
          Authorization: token
        },
        data
      }).then(res => {
        this.message = "";
        this.$toast.success("发布成功");

        // 重新请求列表数据
        // 先清空数据,不清空的话会有重复的评论
        this.list = [];
        this.pageIndex = 1;
        this.finished = false;
        this.getCommentList();
        // 清空回复的数据
        this.reply = {};
      });
    },
    // 点击回复按钮,回复评论
    handleReply(item) {
      setTimeout(() => {
        // 记录下来点击回复的评论信息
        this.reply = item;
        // 点击回复,输入框弹出来
        this.isFocus = true;
        this.$refs.textarea.focus();
      }, 300);
    }
  }
};
</script>

<style scoped lang="less">
.container {
  padding-bottom: 60/360 * 100vw;
}
.comment {
  margin: 30/360 * 100vw 15/360 * 100vw;
  border-bottom: 1px #eee solid;
  font-size: 13px;
  .comment-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15/360 * 100vw;
    .user {
      display: flex;
      align-items: center;
      img {
        display: block;
        width: 35/360 * 100vw;
        height: 35/360 * 100vw;
        border-radius: 50%;
        margin-right: 5px;
      }
      span {
        color: #999;
        font-size: 12px;
      }
    }
    .reply {
      font-size: 12px;
    }
  }
  .content {
    margin-top: 10/360 * 100vw;
    padding: 5px;
    padding-top: 0;
  }
}
.publish {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 5/360 * 100vw 15/360 * 100vw;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .textarea {
    background: #eee;
    border-radius: 50px;
    padding: 5px 20px;
  }
  .ative {
    height: 82px !important;
    border-radius: 8px;
  }

  .submit {
    margin-left: 5px;
    padding: 3px 10px;
    color: #fff;
    background: red;
    border-radius: 50px;
    font-size: 12px;
    flex-shrink: 0;
  }
}
</style> 