<template>
  <div class='recharge'>
    <div class="top">
      <x-header :left-options="{backText: ''}">{{ topMessage }}</x-header>
    </div>
    <div class="rechargeContent">
      <div class="rechargeNum">
        <span class="recharge_num">充值账号</span>
        <span class="recharge_content">155******134</span>
      </div>
      <div class="rechargeMoney">
        <div>提现金额</div>
        <div style="font-size: 0.40rem">
          <span>￥</span>
          <input type="number"/>
        </div>
        <div class="rechargeLine"></div>
        <div class="rechargeTip">当前余额为23130银两</div>
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
        btnMessage: '去支付',
        topMessage: '充值'
      }
    },
  }
</script>
<style scoped>
  .vux-header { background-color: #ffffff;}
  .top >>> .vux-header-title {color: #000;}
  .top >>> .vux-header-left .left-arrow:before {border-color:#000;}

  .rechargeContent {
    padding: 0.55rem 0.30rem;
    font-size: 0.30rem;
  }
  .rechargeNum {
    padding: 0.30rem 0.20rem;
    background-color: #fff4ed;
  }
  .recharge_num {
    margin-right: 1.05rem;
  }
  .recharge_content {
    color: #f86e0e;
  }
  .rechargeMoney {
    padding: 0.35rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 2.30rem;
    background-color: #fff;
  }
  .rechargeLine {
    border: 0.5px solid #ccc;
  }
  .rechargeTip {
    color: #a9a9a9;
    font-size: 0.26rem;
  }
</style>
