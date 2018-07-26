<template>
  <div class='shareBonusList'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}<a @click="couponIntro" slot="right">{{ topRightMessage }}</a></x-header>
    </div>
    <div>
      <tab :line-width=2 active-color='#f9925d' v-model="index">
        <tab-item
          class="vux-center"
          v-bind:style="{fontSize: '0.34rem'}"
          v-for="(item, index) in list2"
          @click.native="tabClick(item, index)"
          :key="index"

        >
          {{item}}
        </tab-item>
      </tab>
      <!--优惠券列表-->

        <div  v-if="itemVal === '折扣红包'">
          <div class="shareBonusListContent">
            <single-coupon :rece-single-conpon="findAllYesDiscount"> </single-coupon>
          </div>
          <div v-if="findAllYesDiscount.length === 0">
            <nothing-coupon> </nothing-coupon>
          </div>
         <!-- <div class="shareTips">
            <span>没有更多券了</span>
            <span>|</span>
            <span style="color: #f86e0e" @click="shareLook">查看我分享的优惠券 ></span>
          </div>-->
        </div>
        <div  v-if="itemVal === '失效红包'">
          <div class="shareBonusListContent">
            <single-coupon :rece-single-conpon="findAllNoDiscount" :title="'失效红包'"> </single-coupon>
          </div>
          <div class="shareTips">
            <!--<span>没有更多券了</span>-->
          </div>
          <div v-if="findAllNoDiscount.length === 0">
            <nothing-coupon> </nothing-coupon>
          </div>
        </div>

    </div>

  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader, Tab, TabItem, } from 'vux'
  import singleCoupon from '../../shop/singleCoupon/singleCoupon'
  const list = () => ['折扣红包', '失效红包']
  import { findAllYesDiscount, findAllNoDiscount } from "@/api/promotion"
  import nothingCoupon from '../../shop/common/nothingCoupon'

  export default {
    components: {
      singleCoupon,
      XHeader,
      Tab,
      TabItem,
      nothingCoupon
    },
    data(){
      return{
        topMessage: '折扣红包',
        topRightMessage: '折扣红包',
        list2: list(),
        index: 0,
        itemVal: '折扣红包',

        pageNum: 1,
        pageSize: 10,
        findAllYesDiscount: [],
        findAllNoDiscount: [],
      }
    },
    props:{

    },
    mounted(){
      this._findAllYesDiscount()
      this._findAllNoDiscount()
    },
    methods:{
      couponIntro() {
        console.log('使用说明')
      },
      tabClick(item, index) {
        console.log(index,item)
        this.itemVal  = item
      },
      /*shareLook() {
        console.log('查看我分享的优惠券')
      }*/
      _findAllYesDiscount() {
        findAllYesDiscount({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
          .then( res => {

            this.findAllYesDiscount = res.data
            console.log('可使用折扣红包', res)

          })
      },
      _findAllNoDiscount() {
        findAllNoDiscount({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
          .then( res => {

            this.findAllNoDiscount = res.data
            console.log('失效折扣红包', res)

          })
      }
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}
  .top >>> .vux-header-right a {color: #f86e0e;}

  .shareBonusList{
    height: 100%;
    background-color: #ffffff;
  }
  .shareBonusListContent {
    border-top: 1px solid #eee;
    max-height: 9.00rem;
    /*overflow: scroll;*/
  }
  .shareTips {
    text-align: center;
    font-size: 0.24rem;
  }
  .shareTips span {
    margin-right: 0.20rem;
  }
</style>
