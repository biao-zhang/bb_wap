<template>
  <div class='orderLineIndex'>
    <div class="line1">
      <img class="orderLineImg1" src="../img/orderLineIndex1.png"/>
      <span class="orderS1">我的订单</span>
      <span class="orderFloatRBox">
        <router-link :to="{path:'/z/myorderindex',query:{orderState:'全部'}}">
          <span class="orderS2">全部</span>
          <img src="../img/next.png" class="orderLineImg2">
        </router-link>
      </span>
    </div>
    <div class="line2">
      <div class="d1">
        <router-link :to="{path:'/z/myorderindex',query:{orderState:'待付款'}}">
          <img src="../img/indexOrderLineLine2Img1.png" class="img1 line2Img1"/>
          <div v-if="dataOne.amounNoPay > 0" class="kuan">{{dataOne.amounNoPay}}</div>
          <div class="line2S1">待付款</div>
        </router-link>
      </div>
      <div class="d1">
        <router-link :to="{path:'/z/myorderindex',query:{orderState:'待发货'}}">
          <img src="../img/indexOrderLineLine2Img2.png" class="img1 line2Img2"/>
          <div v-if="dataOne.amountNoDelivery > 0 " class="kuan">{{dataOne.amountNoDelivery}}</div>
          <div class="line2S1">待发货</div>
        </router-link>
      </div>
      <div class="d1">
        <router-link :to="{path:'/z/myorderindex',query:{orderState:'待收货'}}">
          <img src="../img/indexOrderLineLine2Img3.png" class="img1 line2Img3"/>
          <div v-if="dataOne.amountNoGoods > 0" class="kuan">{{dataOne.amountNoGoods}}</div>
          <div class="line2S1">待收货</div>
        </router-link>
      </div>
      <div class="d1">
        <router-link :to="{path:'/z/myorderindex',query:{orderState:'待评价'}}">
          <img src="../img/indexOrderLineLine2Img4.png" class="img1 line2Img4"/>
          <div v-if="dataOne.amountNoEvaluation > 0" class="kuan">{{dataOne.amountNoEvaluation}}</div>
          <div class="line2S1">待评价</div>
        </router-link>
      </div>
      <div class="d1">
        <router-link :to="{path:'/x/refundList',query:''}">
          <img src="../img/indexOrderLineLine2Img5.png" class="img1 line2Img5"/>
          <div v-if="dataOne.amountInRefund > 0" class="kuan">{{dataOne.amountInRefund}}</div>
          <div class="line2S1">退款</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  export default{
    data(){
      return{
        dataOne:{}
      }
    },
    watch: {
      datas(val) {
        this.dataOne = val;
        console.log('6666',this.dataOne)
      }
    },
    props:{
      datas:{
        type:Object,
        default:()=>{
          return{}
        }
      },
    },
    mounted(){
//      console.log('6666',this.dataOne)
    },
    methods:{

    },
  }
</script>
<style scoped>
.orderLineIndex{ width:100%;height:2.35rem;background-color: white;padding:0 0.2rem;box-sizing: border-box;margin:0.2rem auto; }

  .line1{width:100%;height: 1rem;padding:0.36rem 0.1rem 0 0.1rem;box-sizing: border-box;border-bottom:1px solid #eee;}
  .line1 .orderLineImg1{width:0.44rem;vertical-align: middle;}
  .line1 .orderS1{font-size: 0.3rem;color:#6a6a6a;vertical-align: middle;margin-left: 0.17rem;}
  .line1 .orderFloatRBox{display: block;float: right;}
  .line1 .orderFloatRBox .orderS2{font-size: 0.24rem;color:#999;vertical-align: middle;}
  .line1 .orderFloatRBox .orderLineImg2{width:0.19rem;height: 0.32rem;vertical-align: middle;margin-left: 0.07rem;}

  .line2{display: flex;width:100%;justify-content: space-around;}
  .line2 .d1{width:1rem;text-align: center}
  .line2 .d1 .img1{padding:0.2rem 0 0;}
  .line2 .d1 .line2Img1{width:0.48rem;}
  .line2 .d1 .line2Img2{width:0.48rem;}
  .line2 .d1 .line2Img3{width:0.48rem;}
  .line2 .d1 .line2Img4{width:0.48rem;}
  .line2 .d1 .line2Img5{width:0.48rem;}
  .line2 .d1 .line2S1{width:100%;font-size: 0.28rem;color:#555;line-height: 0.5rem;}

  .d1{position:relative;}
  .kuan{width:0.3rem;height:0.3rem;position:absolute;top:0.1rem;right:0.2rem;background:#f86e0e;color:#fff;text-align:center;line-height:0.3rem;border-radius: 50%;font-size:0.2rem;}
</style>
