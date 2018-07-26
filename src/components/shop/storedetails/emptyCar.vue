<template>
  <div class="emptycar">
    <!--头部-->
    <x-header :msg="top" ref="xheader"></x-header>
    <!--空-->
    <div class="empty">
      <div class="cark">
          <div class="cark_img">
              <img src="../img/carempty.png" alt="">
          </div>
          <!--文字-->
          <div class="car_text">
              <p>还是空空如也</p>
              <p>快去挑些自己喜欢的宝贝吧~</p>
          </div>
          <!--去逛逛-->
          <div class="guang">
              <span>去逛逛></span>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  import xHeader from '@/components/shop/common/xHeader'

  export default {
    data(){
      return{
        top:"购物车"
      }
    },
    components:{xHeader},
  }
</script>
<style scoped>
    .emptycar{
      background:#fff;
      height:100%;
    }
    .empty{
      padding-top:46px;
      background:#f5f5f5;
    }
    .cark{
      margin-top:0.1rem;
      background:#fff;
      padding-bottom: 0.5rem;
    }
    .cark_img{
      height:4rem;
      display: flex;
      justify-content: center;
      padding-top:0.24rem;
    }
    .cark_img img{
      width:4rem;
      height:4rem;
    }
  /*文字*/
    .car_text{
      text-align:center;
      padding:0.5rem 0;
    }
    .car_text p{
      font-size:0.3rem;
      color:#333333;
      line-height:0.45rem;
    }
  /*去逛逛*/
    .guang{
      text-align:center;
    }
    .guang span{
      height:0.76rem;
      width:4rem;
      display: block;
      margin:0 auto;
      line-height:0.76rem;
      border:0.02rem solid #f86e0e;
      border-radius:0.5rem;
      color:#f86e0e;
      font-size:0.3rem;
    }
</style>
