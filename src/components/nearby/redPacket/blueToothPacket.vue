<template>
  <div class="blueToothPacket">
    <x-header class="xheader"  :left-options="{backText:''}" :title="msg" :right-options="{showMore:false}" ref="head"></x-header>
    <div class="con">
      <img src="../img/blueToothPacket.png" class="img1">
      <div class="btnBox">
        <div class="line0">啊啊啊啊</div>
        <div class="line1">10.00元</div>
        <div class="line2">可用于此店铺消费</div>
        <div class="line3">扫码结算</div>
        <div class="line3">查看我的折扣红包</div>
      </div>
    </div>
    <shine></shine>
  </div>
</template>
<script>

  import shine from '@/components/nearby/common/shine'
  import {XHeader} from 'vux'
  export default {
    data(){
      return{
        msg:'蓝牙红包'
      }
    },
    components:{XHeader,shine},
    mounted(){

    }
  }
</script>
<style scoped>
  .blueToothPacket{width:100%;height: 100%;}

  .xheader{width:100%;background-color: white;}
  .blueToothPacket >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .blueToothPacket >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right a .titleRight{font-size: 0.28rem;color:#f86e0e}

  .con{width:100%;box-sizing: border-box;}
  .con .img1{width:3.43rem;height: 2.77rem;display: block;margin:auto;padding:2.07rem 0 0.39rem;}

  .con .btnBox{width:100%;}
  .btnBox .line0{text-align: center;font-size: 0.3rem;color:#333;}
  .btnBox .line1{text-align: center;font-size: 0.48rem;color:#db001b;margin:0.4rem 0 0.2rem;}
  .btnBox .line2{text-align: center;font-size: 0.24rem;color:#999;margin-bottom: 0.6rem;}
  .btnBox .line3{text-align: center;width:4rem;height: 0.8rem;border-radius: 0.05rem;box-sizing: border-box;border:0.02rem solid #f86e0e;margin:0.3rem auto;font-size: 0.32rem;color: #f86e0e;line-height: 0.8rem;}
</style>
