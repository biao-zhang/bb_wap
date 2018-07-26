<template>
  <div class='shareBonusList'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class="shareBonusListContent">
      <single-coupon :rece-single-conpon="imgUrls" @look="_look"> </single-coupon>
    </div>
    <div class="shareTips">
      <span>没有更多券了</span>
      <span>|</span>
      <span style="color: #f86e0e">查看我分享的优惠券 ></span>
    </div>
    <!--查看优惠券领取记录弹窗-->
    <div v-transfer-dom>
      <popup v-model="couponHistory" position="bottom" >
        <div>
          <div class="popup_title">
            <span></span>
            <span>领取详情</span>
            <span @click="close">
              <i class="iconfont icon-guanbi"></i>
            </span>
          </div>
          <div class="popup_con" v-for="item in 3">
            <div class="popup_con_left">
              <div class="popup_con_left_pic">
                <img src="../img/looktou.png"/>
              </div>
              <div style="display: flex; align-items: center">梦想者</div>
            </div>
            <div class="popup_con_right">已使用</div>
          </div>
          <div style="height: 3.19rem; background-color: #ffffff"></div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader, TransferDom, Popup } from 'vux'
  import singleCoupon from '../../shop/singleCoupon/singleCoupon'
  export default{
    directives: {
      TransferDom
    },
    components: {
      singleCoupon,
      XHeader,
      Popup
    },
    data(){
      return{
        topMessage: '分享列表',
        couponHistory: false,    // 优惠券领取记录
        imgUrls: [
          {
            title: '分享列表',
            coupon: 'url(' + require('../img/couponsGet.png') + ')',
            money: 30,
            info1: '通用店铺',
            info2: '满200元可用,平台全部店铺',
            dateLImit1: '2016.10.16',
            dateLImit2: '2017.08.12',
            color: '#308bac'
          },
          {
            title: '分享列表',
            coupon: 'url(' + require('../img/couponsSet.png') + ')',
            money: 40,
            info1: '洁丽雅丫丫毛衣专卖店',
            info2: '满100元可用，仅限此店铺',
            dateLImit1: '2016.10.16',
            dateLImit2: '2017.08.12',
            color: '#a45d2c'
          },
          {
            title: '分享列表',
            coupon: 'url(' + require('../img/couponsGet.png') + ')',
            money: 50,
            info1: '通用店铺',
            info2: '满200元可用,平台全部店铺',
            dateLImit1: '2016.10.16',
            dateLImit2: '2017.08.12',
            color: '#308bac'
          },
          {
            title: '分享列表',
            coupon: 'url(' + require('../img/couponsSet.png') + ')',
            money: 60,
            info1: '洁丽雅丫丫毛衣专卖店',
            info2: '满100元可用，仅限此店铺',
            dateLImit1: '2016.10.16',
            dateLImit2: '2017.08.12',
            color: '#a45d2c'
          },
          {
            title: '分享列表',
            coupon: 'url(' + require('../img/couponsGet.png') + ')',
            money: 10,
            info1: '通用店铺',
            info2: '满200元可用,平台全部店铺',
            dateLImit1: '2016.10.16',
            dateLImit2: '2017.08.12',
            color: '#308bac'
          },
        ],
      }
    },
    props:{

    },
    mounted(){

    },
    methods:{
      _look(bool) {
        this.couponHistory = bool
        console.log('shareBonusList')
      },
      close() {
        this.couponHistory = false
        console.log('X')
      }
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .shareBonusListContent {
    border-top: 1px solid #eee;
    max-height: 9.00rem;
    overflow: scroll;
  }
  .shareTips {
    margin-top: 1.00rem;
    text-align: center;
    font-size: 0.24rem;
  }
  .shareTips span {
    margin-right: 0.20rem;
  }
  .popup_title {
    font-size: 0.30rem;
    padding: 0.30rem 0.20rem;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-bottom: 1px solid #eee;
  }
  .popup_con {
    padding: 0.20rem 0.40rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
  }
  .popup_con_left {
    display: flex;
  }
  .popup_con_left_pic {
    margin-right: 0.20rem;
  }
  .popup_con_left_pic img {
    width: 1.00rem;
  }
  .popup_con_right {
    width: 1.20rem;
    height: 0.50rem;
    border-radius: 0.05rem;
    text-align: center;
    line-height: 0.50rem;
    font-size: 0.24rem;
    color: #ffffff;
    background: linear-gradient(left, #f86d0f, #f15352);
  }
</style>
