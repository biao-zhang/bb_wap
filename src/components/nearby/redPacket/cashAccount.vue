<template>
  <div class="cashAccount">
    <x-header class="xheader"  :left-options="{backText:''}" :title="msg" :right-options="{showMore:false}" ref="head">
      <a slot="right" ><router-link to="/service" class="titleRight">资金明细</router-link></a>
    </x-header>
    <div class="con">
      <img src="../img/cashAccount.png" class="img1">
      <div class="btnBox">
        <div class="line1">10.00元</div>
        <div class="line2">充值</div>
      </div>
    </div>
  </div>
</template>
<script>

  import {XHeader} from 'vux'
  export default {
    data(){
      return{
        msg:'现金账户'
      }
    },
    components:{XHeader},
    mounted(){

    }
  }
</script>
<style scoped>
  .cashAccount{width:100%;height: 100%;}

  .xheader{width:100%;background-color: white;}
  .cashAccount >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .cashAccount >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right a .titleRight{font-size: 0.28rem;color:#f86e0e}

  .con{width:100%;box-sizing: border-box;}
  .con .img1{width:3.43rem;height: 2.77rem;display: block;margin:auto;padding:2.07rem 0 1.07rem;}

  .con .btnBox{width:100%;}
  .btnBox .line1{text-align: center;font-size: 0.48rem;color:#db001b;margin-bottom:1.2rem;}
  .btnBox .line2{text-align: center;font-size: 0.32rem;color:#fff;width:6.57rem;height: 0.8rem;line-height: 0.8rem;background-color: #f66e26;border-radius: 0.05rem;margin:auto;box-shadow: 0 0 10px #999;}
</style>
