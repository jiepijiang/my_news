<template>
  <div class="imgList">
    <h4>林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</h4>
    <div class="images">
      <img
        src="https://img20.360buyimg.com/da/s590x470_jfs/t1/6412/18/141/70492/5bacdaf3E48cea54f/414c8264705bd268.jpg.webp"
      />
      <img
        src="https://img20.360buyimg.com/da/s590x470_jfs/t1/6412/18/141/70492/5bacdaf3E48cea54f/414c8264705bd268.jpg.webp"
      />
      <img
        src="https://img20.360buyimg.com/da/s590x470_jfs/t1/6412/18/141/70492/5bacdaf3E48cea54f/414c8264705bd268.jpg.webp"
      />
    </div>
    <p>火星时报 52跟帖</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.imgList {
  padding: 20/360 * 100vw;
  border-bottom: 1px #eee solid;

  h4 {
    // 文字超出两行出现省略号
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: normal;
  }

  .images {
    margin: 10/360 * 100vw 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 33%;
      height: 75/360 * 100vw;
      object-fit: cover;
    }
  }

  p {
    color: #999;
    margin-top: 5px;
  }
}
</style>