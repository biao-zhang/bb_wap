<template>
  <div style="height: 100%">
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ msg_m }}</x-header>
    </div>
    <div class="xian"></div>
    <div :style="{height: orderHeightL+'px'}" v-if="findAllDiscount.length !== 0" style="background-color: #ffffff">
      <div class="coupon_middle">
        <div class="coupon_middle_title">提示: 点击领取折扣红包</div>
      </div>
      <div class="coupon_pad">
        <single-coupon :rece-single-conpon="findAllDiscount" @userGetDiscount="userGetDiscount" :flag="'所有折扣红包'"> </single-coupon>
      </div>
    </div>
    <div v-else>
      <nothing-coupon> </nothing-coupon>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'
  import SingleCoupon from '../singleCoupon/singleCoupon'
  import { findAllDiscount } from "@/api/promotion"
  import nothingCoupon from './nothingCoupon'

  export default {
    components: {
      XHeader,
      SingleCoupon,
      nothingCoupon
    },
    data() {
      return {
        msg_m: '折扣红包',

        pageNum: 1,
        pageSize: 10,
        adcode: '',
        findAllDiscount: []
      }
    },
    mounted() {
      this.adcode = localStorage.getItem('curCityAdcode')

      this._findAllDiscount()

      setTimeout(() => {this.orderHeightL = window.innerHeight - 46 - 5}, 20)
    },
    methods: {
      // 重新请求红包列表
      userGetDiscount() {
        this._findAllDiscount()
      },

      // 所有折扣红包
      _findAllDiscount() {
        findAllDiscount({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          adcode: this.adcode
        })
          .then( res => {

            this.findAllDiscount = res.data
            console.log('所有折扣红包', res)

          })
      },
    }
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top{    position: fixed;
    left: 0;
    /* display: block; */
    width: 100%;
    top: 0;
    z-index: 2;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .coupon_middle {
    padding:0 0.80rem;
    margin-top: 0.10rem;
    background: #ffffff;
  }
  .coupon_middle_title {
    padding: 0.20rem 0;
    font-size: 0.24rem;
    color: #f86e0e;
  }
  .xian{padding-top:46px;}

</style>
   
