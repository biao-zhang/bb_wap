<template>
  <div class="taskPacket">
    <x-header class="xheader"  :left-options="{backText:''}" :title="msg" :right-options="{showMore:false}" ref="head"></x-header>
    <div class="con">
      <img src="../img/blueToothPacket.png" class="img1">
      <div class="btnBox">
        <div class="line0">平台发放</div>
        <div class="line1">10.00元</div>
        <div class="line2">已放入现金账户内</div>
        <div class="line3">查看现金账户</div>
      </div>
    </div>
  </div>
</template>
<script>

  import {XHeader} from 'vux'
  export default {
    data(){
      return{
        msg:'任务红包'
      }
    },
    components:{XHeader},
    mounted(){

    }
  }
</script>
<style scoped>
  .taskPacket{width:100%;height: 100%;}

  .xheader{width:100%;background-color: white;}
  .taskPacket >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .taskPacket >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right a .titleRight{font-size: 0.28rem;color:#f86e0e}

  .con{width:100%;box-sizing: border-box;}
  .con .img1{width:3.43rem;height: 2.77rem;display: block;margin:auto;padding:2.07rem 0 0.39rem;}

  .con .btnBox{width:100%;}
  .btnBox .line0{text-align: center;font-size: 0.3rem;color:#333;}
  .btnBox .line1{text-align: center;font-size: 0.48rem;color:#db001b;margin:0.4rem 0 0.2rem;}
  .btnBox .line2{text-align: center;font-size: 0.24rem;color:#999;margin-bottom: 0.6rem;}
  .btnBox .line3{text-align: center;width:4rem;height: 0.8rem;border-radius: 0.05rem;box-sizing: border-box;border:0.02rem solid #f86e0e;margin:0.3rem auto;font-size: 0.32rem;color: #f86e0e;line-height: 0.8rem;}
</style>
