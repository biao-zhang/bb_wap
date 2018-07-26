<template>
  <div class='recharge'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class="rechargeContent">
      <div class="rechargeStore">
        <div class="rechargePic"></div>
        <div style="margin-top: 0.24rem">
          <span style="font-size: 0.24rem">付款给</span>
          <span class="rechargeStoreName">毛衣专卖店</span>
        </div>
      </div>
      <div class="rechargeMoney">
        <div>付款金额</div>
        <div style="font-size: 0.40rem">
          <span>￥</span>
          <input type="number"/>
        </div>
        <div class="rechargeLine"></div>

      </div>
    </div>
    <div style="margin-top: 1.15rem">
      <my-btn :btn-text="btnMessage"> </my-btn>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */
  import { XHeader } from 'vux'
  import myBtn from '../common/myBtn'
  export default{
    components: {
      myBtn,
      XHeader
    },
    data(){
      return{
        btnMessage: '确认支付',
        topMessage: '付款'
      }
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .rechargeContent {
    padding: 0 0.30rem;
    font-size: 0.30rem;
  }

  .rechargeMoney {
    padding: 0.35rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 1.80rem;
    background-color: #fff;
  }
  .rechargeLine {
    border: 0.5px solid #ccc;
  }
  .rechargeStore {
    padding: 0.45rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rechargePic {
    width: 1.60rem;
    height: 1.60rem;
    background-color: #cccccc;
  }
  .rechargeStoreName {
    color: #f86e0e;
  }
</style>
