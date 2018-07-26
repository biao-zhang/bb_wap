<template>
  <div class="refundListItem">
    <div class="tit">
      <span class="s1"><img class="s1Img" :src="itemChildren.goodsImgMaster">{{ itemChildren.shopName }}</span>
      <div>
        <!--退款状态-->
        <div v-if="itemChildren.refundStatus === 0" class="goodsOrder-title status" >退款中</div>
        <div v-if="itemChildren.refundStatus === 5" class="goodsOrder-title status" >商户审核确认退款</div>
        <!--<div v-if="itemChildren.refundStatus === 10" class="goodsOrder-title status" >取消售后</div>-->
        <div v-if="itemChildren.refundStatus === 12" class="goodsOrder-title status" >商户拒绝退款</div>
        <div v-if="itemChildren.refundStatus === 13" class="goodsOrder-title status" >商户已退款</div>
        <div v-if="itemChildren.refundStatus === 14" class="goodsOrder-title status" >商户退款失败</div>
        <!--end-->
      </div>
    </div>
    <div class="content" @click="reDetail">
      <div class="img1Box"><img class="img1" :src="itemChildren.goodsImgMaster" /> </div>
      <div class="img1BoxR">
        <div class="line1">{{ itemChildren.goodsName }}</div>
        <div class="line2">{{ itemChildren.goodsSpecs }}</div>
        <div class="line3">x{{ itemChildren.refundNum }}</div>
      </div>
    </div>
    <div class="bottom">
      <span class="button" @click="backMoney">撤销退款</span>
    </div>
  </div>
</template>
<script>
  import { cancelAfterSale } from "@/api/personally"

  export default {
    data(){
      return{

      }
    },
    props: ['itemChildren'],
    mounted() {

    },
    methods: {
      backMoney() {
        cancelAfterSale({
          recId: this.itemChildren.recid
        }).then( res => {

          this.$emit('reMoney')
          console.log('b2c取消退款', res)

        })
      },
      reDetail() {
        this.$router.push({path: '/x/refund', query: {recid: this.itemChildren.recid}})
      }
    }
  }
</script>
<style scoped>
  .refundListItem{width:100%;height: 4.7rem;background-color: white;box-sizing: border-box;margin-bottom:0.1rem;}

  .tit{padding:0.24rem 0.2rem;display: flex; justify-content: space-between}
  .tit .s1{font-size: 0.26rem;color:#333;line-height: 0.4rem;}
  .tit .s1 .s1Img{width:0.4rem;height: 0.4rem;margin-right: 0.13rem;vertical-align: text-bottom}
  .tit .s2{color:#f86e0e;font-size: 0.26rem;line-height: 0.4rem;float: right;}

  .content{display: flex;justify-content: space-between;width:100%;padding:0.1rem 0.2rem;background-color: #fffaf7;box-sizing: border-box;}
  .content .img1Box{width:2.4rem;height: 2.4rem;}
  .content .img1Box .img1{width:100%;height: 100%;}

  .content .img1BoxR{height: 2.4rem;width:4.2rem;}
  .content .img1BoxR .line1{font-size: 0.3rem;color:#3c3c3c;height:1rem;line-height: 0.5rem;}
  .content .img1BoxR .line2{font-size: 0.24rem;color:#9a9a9a;height: 0.8rem;line-height: 0.4rem;}
  .content .img1BoxR .line3{text-align:right;font-size: 0.24rem;color:#9a9a9a;height: 0.8rem;line-height: 0.8rem;}

  .bottom{width:100%;padding:0.2rem;box-sizing: border-box;height: 1rem;}
  .bottom .button{display: inline-block;width:1.5rem;height: 0.6rem;line-height: 0.6rem;text-align: center;color:#fd593d;font-size: 0.26rem;border-radius: 0.06rem;border:0.02rem solid #fd593d;float: right;}
  .goodsOrder-title {color: #f86e0e}
</style>
