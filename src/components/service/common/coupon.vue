<template>
  <div style="background-color: #ffffff">
    <div class="top">
      <x-header :left-options="{backText: ''}">{{msg}}</x-header>
    </div>
    <div class="coupon_top" style="position: relative;">
      <div class="top_img">
        <img src="../img/detais_tou.png"/>
      </div>
      <div class="top_ipt">
        <span>积分抵扣：</span>
        <input v-model="num_value" type="number" />
        <span>分</span>
      </div>
      <div class="top_tips">
        <span>可用积分0积分，100积分=1元</span>
      </div>
    </div>
    <div class="coupon_middle">
      <div class="coupon_middle_title">选择优惠券</div>
      <div
        class="coupon_middle_img"
        v-for="item in imgUrls"
        v-bind:style="{ backgroundImage: item.coupon,backgroundSize: '100% 100%'}"
      >
        <div class="coupon_middle_two">
          <div>使用期限：<span>2016.10.16</span> ~  <span>2017.08.12</span></div>
          <div>未使用</div>
        </div>
      </div>
    </div>
    <div class="coupon_foot">
      <div @click="btnClick" class="coupon_foot_btn">确定</div>
    </div>
  </div>
</template>
<script>
  import { XHeader } from 'vux'

  export default {
    components: { XHeader },
    data() {
      return {
        msg: '优惠券/积分',
        imgUrls: [
          {coupon: 'url(' + require('../img/youhuiquan.png') + ')'},
          {coupon: 'url(' + require('../img/youhuiquanblue.png') + ')'},
          {coupon: 'url(' + require('../img/youhuiquan.png') + ')'},
          {coupon: 'url(' + require('../img/youhuiquan.png') + ')'},
          {coupon: 'url(' + require('../img/youhuiquanblue.png') + ')'},

        ],
        num_value: ''
      }
    },
    methods: {
      btnClick() {
        console.log('积分抵扣：' + this.num_value);
      }
    }
  }

</script>
<style scoped>
  .vux-header { background: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .coupon_top,.coupon_middle,.coupon_foot {padding-left: 0.75rem;}
  .coupon_foot {padding-top: 0.77rem; background-color: #f5f5f5;}
  .top_img {padding: 0.20rem 0;}
  .top_img img {width: 1.30rem;}
  .top_ipt span {font-size: 0.34rem;}
  .top_ipt input {
    border: 1px solid #cccccc;
    width: 3.80rem;
    height: 0.50rem;
    border-radius: 3px;
  }
  .top_tips {
    padding: 0.20rem 0;
    font-size: 0.24rem;
    color: #b6b6b6;
  }
  .coupon_middle {margin-top: 0.60rem; overflow: scroll; height: 5.60rem;}
  .coupon_middle_title {font-size: 0.34rem; margin-bottom: 0.15rem;}
  .coupon_middle_img {
    width: 5.85rem;
    height: 2.40rem;
    display: flex;
    align-items: flex-end;
    margin-bottom: 0.30rem;
  }
  .coupon_middle_two {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.24rem;
    padding: 0.10rem;
    color: #666666;
  }
  .coupon_foot_btn {
    width: 5.85rem;
    height: 0.80rem;
    background-color: #f86e0e;
    text-align: center;
    line-height: 0.80rem;
    color: #ffffff;
    font-size: 0.32rem;
    border-radius: 5px;
  }
</style>
