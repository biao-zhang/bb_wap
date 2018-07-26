<template>
  <div class="swiperItem">
    <!--信息-->
    <div class="ioFo">
      <div class="ioFo1">
        <div class="shAre">
          <span>终端店</span>
          <span>【新春特惠】喜多果富士苹果礼盒5斤装</span>
        </div>
      </div>
      <!--价格-->
      <div class="money">
        <div>
          <p>￥57.9</p>
          <p>￥299</p>
        </div>
        <div>
            <span>到店消费</span>
        </div>
      </div>
    </div>
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
    justify-content: space-between;
    margin-top:0.3rem;
  }
  .money div:first-child{
    display: flex;
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
  .money div span{
    font-size:0.24rem;
    color:#666666;
  }
  /*线*/
  .wire{
    width:100%;
    height:0.2rem;
    background:#f5f5f5;
  }
</style>
