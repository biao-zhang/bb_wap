<template>
  <div class="bluetoothnull">
    <!--线-->
    <div class="wire"></div>
    <!--图片-->
    <div class="null_red">
      <img src="../../img/nullRed.png" alt="">
    </div>
    <!--文字-->
    <div class="wenzi">附近没有搜索到蓝牙红包~</div>
    <!--按钮-->
    <div class="btn">返回附近红包</div>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    components:{},
  }
</script>
<style scoped>
  .bluetoothnull{background:#fff; height:100%;box-sizing: border-box;}
  /*线*/
  .wire{width:100%;height:0.1rem;background:#f5f5f5;}
  /*图片*/
  .null_red{text-align:center;padding-top:1.02rem; padding-bottom:0.6rem;}
  .null_red img{width:3.4rem;height:4.22rem;}
  /*文字*/
  .wenzi{text-align:center;line-height: 35px;color: #333333;font-size:0.3rem;}
  /*按钮*/
  .btn{width:4rem;height:0.8rem;border-radius:0.4rem;border: solid 0.02rem #f86e0e;text-align:center;line-height:0.8rem;margin:0.62rem auto 0;color: #f86e0e;letter-spacing: 0px;}
</style>
