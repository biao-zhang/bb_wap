<template>
  <div class="swiperItem">
    <!--轮播图-->
    <swiper loop auto  height="7.5rem" :show-dots="true" dots-position="center">
      <swiper-item><img style="width:100%;height: 100%;" src="../img/ban1.png"></swiper-item>
      <swiper-item><img style="width:100%;height: 100%;" src="../img/ban1.png"></swiper-item>
      <swiper-item><img style="width:100%;height: 100%;" src="../img/ban1.png"></swiper-item>
    </swiper>
    <!--信息-->
    <terminal-iofo></terminal-iofo>
    <!--线-->
    <div class="wire"></div>
    <!--选择规格-->
    <div class="ticket">
      <gui-ge></gui-ge>
    </div>
    <!--线-->
    <div class="wire"></div>
    <!--评价-->
    <low-evaluation></low-evaluation>
    <!--底部 购买信息 -->
    <payment-footer></payment-footer> 
    <!--线1-->
    <div class="wire2"></div>
  </div>
</template>
<script>
  import {Swiper,SwiperItem} from 'vux'
  import terminalIofo from '@/components/shop/storedetails/assembly/terminalIofo.vue' 
  import lowEvaluation from '@/components/shop/common/lowEvaluation' 
  import paymentFooter from '@/components/shop/storedetails/assembly/paymentFooter' 
  import guiGe from '@/components/shop/common/guiGe' 
  export default {
    data(){
      return{

      }
    },
    components:{Swiper,SwiperItem,terminalIofo,lowEvaluation,paymentFooter,guiGe},
  }
</script>
<style scoped>
  .shopIndex{background-color: #f5f5f5;height: 100%;}
  .shopIndex .pullTos{width:100%;height: 100%;padding-top:0.54rem;}
  .black img{
    height:7.5rem;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
    background-color:#248;
  }
  .vux-slider > .vux-indicator > a > .vux-icon-dot, .vux-slider .vux-indicator-right > a > .vux-icon-dot{
    background-color:#843f0d;
  }
  /*信息*/
  .ioFo{
    width:100%;
    padding:0.24rem 0.2rem;
    box-sizing: border-box;
  }
  .ioFo1{
    display:flex;
    justify-content: space-between;
  }
  .shAre{
    /*width:60%;*/
    flex:1;
  }
  .shAre span:first-child{
    color:#fff;
    font-size:0.24rem;
    display:inline-block;
    background:#fa6e00;
    padding:0.1rem 0.14rem;
    border-radius:0.1rem;
  }
  .shAre span:last-child{
    color:#3c3c3c;
    font-size:0.3rem;
    font-weight:600;
    line-height:0.55rem;
  }
  .shAre1{
    width:0.46rem;
    height:0.76rem;
    margin-right:0.1rem;
    margin-left:0.4rem;
  }
  .shAre1 img{
    width:0.46rem;
    height:100%;
    display: inline-block;
  }
  /*价格*/
  .money{
    line-height:0.48rem;
    display:flex;
  }
  .money p:first-child{
    color:#f86e0e;
    font-weight:600;
    font-size:0.3rem;
  }
  .money p:last-child{
    margin-left:0.4rem;
    color:#9a9a9a;
    text-decoration:line-through;
  }
  /*月销*/
  .monthlySales{
    font-size:0.24rem;
    color:#666666;
    display:flex;
    justify-content: space-between;
    line-height:0.45rem;
  }
  /*线*/
  .wire{
    width:100%;
    height:0.2rem;
    background:#f5f5f5;
  }
  .wire1{
    width:100%;
    height:0.1rem;
    background:#f5f5f5;
  }
  .wire2{
    width:100%;
    height:0.1rem;
    background:#f5f5f5;
    padding-bottom:1.2rem;
  }
  /*选择规格*/
  .ticket{
    display:flex;
    padding:0.2rem 0.26rem ;
    justify-content:space-between;
    align-items: center;
  }
</style>
