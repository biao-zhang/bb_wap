<template>
  <div class='orderItemChildren'>
    <router-link :to="{path: '/y/shopGoodsDetail', query: {recommendId: datas.goodsId, goodsType: 2, isShop: 1}}">
      <div class="storeDetails">
        <div class="storeDetailsImg">
          <!--../../shop/img/storePicture.png-->
          <img :src="datas ? datas.goodsImgMaster : require('../../shop/img/storePicture.png')"/>
        </div>
        <div>
          <div class="storeRight">
            <div>
              <div class="storeDetailsTitle re-twoLineOverFlow">{{ datas.goodsName }}</div>
              <!--<div class="storeHC">{{ orderChildren.storeHC }}</div>-->
            </div>
            <div style="color: #999999; margin: 0.40rem 0">
              <span>规格：{{ datas.goodsSpecs }}</span>
            </div>
            <div class="storeMoneyTwo">
              <div class="storeMoney"><span>￥</span><span>{{ datas.goodsPrice }}</span></div>
              <div class="storeQua"><span>x</span><span>{{ datas.saleNum }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
    <div class="detailStatus">
      <div v-if="datas.state === 1" style="padding: 0.20rem">
        <!--<div class="detailStatusItem" style="display: inline-block" @click="refund">申请退款</div>-->
        <div class="detailStatusItem" style="display: inline-block" @click="toComment">去评价 </div>
      </div>
      <div v-if="datas.state === 2" style="padding: 0.20rem">
        <!--<div class="detailStatusItem" style="display: inline-block" @click="refund">申请退款</div>-->
        <div class="detailStatusItem" style="display: inline-block" @click="toComment">去追评 </div>
      </div>
      <div v-if="datas.state === 3" style="padding: 0.20rem">
        <!--<div class="detailStatusItem" style="display: inline-block" @click="refund"> 申请退款 </div>-->
        <!--<div class="detailStatusItem" style="display: inline-block" @click="toComment"> </div>-->
      </div>
      <div v-if="datas.state === 4" >
        <!--<div class="detailStatusItem" style="display: inline-block" @click="refund">已申请退款</div>-->
        <!--<div class="detailStatusItem" style="display: inline-block" @click="toComment"> </div>-->
      </div>
      <div v-if="datas.state === 5" >
       <!-- <div class="detailStatusItem" style="display: inline-block" @click="operate1">删除订单</div>
        <div class="detailStatusItem" style="display: inline-block" @click="operate2">查看物流 </div>-->
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

      }
    },
    props: ['datas'],
    mounted(){

    },
    methods:{
      refund() {
        if (this.datas.state !== 4) {

          this.$router.push({path: '/x/applyRefund', query: {itemId: this.datas.itemId, detail_id: this.datas.detail_id }})

        } else {}

      },
      toComment() {

        if (this.datas.state === 1) {

          this.$router.push({path: '/z/terPublishComment', query: {itemId: this.datas.itemId, type: 'evaluate' }})

        } else if (this.datas.state === 2) {

          this.$router.push({path: '/z/terPublishComment', query: {itemId: this.datas.itemId, type: 'addevaluate' }})

        }

      }
    },
  }
</script>
<style scoped>
  .order_content {
    background-color: #ffffff;
    margin-bottom: 0.10rem;
  }
  .storeTitle {
    padding: 0.20rem;
    display: flex;
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
  }
  .storeTitle img  {
    width: 0.43rem;
    margin-right: 0.15rem;
  }
  .buyStatus {
    color: #f86e0e;
    font-size: 0.26rem;
  }
  .storeDetails {
    padding: 0.20rem;
    background-color: #fffaf7;
    display: flex;
  }
  .storeDetailsImg {
    margin-right: 0.60rem;
  }
  .storeDetailsImg img {
    width: 2.41rem;
    height: 2.41rem;
  }
  .storeDetailsTitle {
    font-size: 0.30rem;
  }
  .storeHC {
    font-size: 0.24rem;
    color: #9a9a9a;
  }
  .storeMoney {
    font-size: 0.30rem;
    color: #f86e0e;
  }
  .storeQua {
    font-size: 0.24rem;
    color: #9a9a9a;
  }
  .storeRight {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .storeMoneyTwo {
    display: flex;
    width: 3.92rem;
    justify-content: space-between;
    padding: 0.20rem 0;
  }
  .detailsInfo {
    padding: 0.20rem;
    /*border-bottom: 1px solid #eee;*/
    display: flex;
    justify-content: flex-end;
    font-size: 0.24rem;
    color: #666;
  }
  .detailsInfo div {
    display: flex;
    align-items: center;
  }
  .detailStatus {
    /*padding: 0.20rem;*/
    display: flex;
    justify-content: flex-end;
  }
  .detailStatusItem {
    border: 2px solid #cccccc;
    border-radius: 20px;
    padding: 0.18rem;
    margin-left: 0.25rem;
    font-size: 0.26rem;
  }
  .detailsBG {
    color: #fd816f;
    border-color: #fd593d;
  }

  .dialogBox {
    border-radius: 0.20rem;
    font-size: 0.34rem;
    background-color: #fff;
  }
  .sureTitel {
    padding: 0.80rem 0;
    text-align: center;
  }
  .sureBtn {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
  }
  .sureBtnCancel,.sureBtnSure {
    padding: 0.35rem 0;
    text-align: center;
    width: 3.25rem;
  }
  .sureBtnSure {
    color: #fff;
    background-color: #f15352;
  }
</style>
