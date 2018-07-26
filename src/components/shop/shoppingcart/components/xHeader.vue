<template>
  <div class="head">
    <x-header class="xheader" :left-options="{backText:''}" @on-click-more="" :title="msg" :right-options="{showMore:false}">
      <a slot="right" class="titleRight" @click="title_more()" v-html="moreState?'编辑':'完成'"></a>
    </x-header>
    <div class="shop_footer" v-if="datas!=null">
      <div  class="footer1" v-if="moreState">
        <div class="L">
          <img v-if="datas.checkStatus==1" @click="changeState(0)" src="../../img/cartRadioTrue.png" class="img">
          <img v-if="datas.checkStatus==0" @click="changeState(1)" src="../../img/cartRadioFalse.png" class="img">
          <span class="s1">全选</span>
          <label class="l">￥{{datas.totalMoney}}</label>
          <span class="s2">合计:</span>
        </div>
        <div class="R">
          <span class="s3" @click="settlement(1)">结算({{datas.totalCount}})</span>
        </div>
      </div>
      <div class="footer2" v-if="!moreState">
        <img v-if="datas.checkStatus==1" class="img2" @click="changeState(0)" src="../../img/cartRadioTrue.png"/>
        <img v-if="datas.checkStatus==0" class="img2" @click="changeState(1)" src="../../img/cartRadioFalse.png"/>
        <span class="s4">全选</span>
        <span class="s5" @click="settlement(0)">删除商品({{datas.totalCount}})</span>
        <span class="s5" @click="settlement(2)">收藏商品({{datas.totalCount}})</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {XHeader} from 'vux'

  export default {
    data(){
      return{
        moreState:true
      }
    },
    props:{
      msg:{
        type:String,
        default:'跑腿'
      },
    },
    computed:{
      datas(){
        return this.$store.state.cart.datas;
      }
    },
    components:{XHeader},
    mounted(){
setTimeout(()=>{
  console.log(this.datas)
},2000)
    },
    methods:{
      title_more(a){
        this.moreState = !this.moreState;
        this.$emit('moreState',this.moreState);
      },
      changeState(a){
        this.$emit('xHeaderState',a)
      },
      settlement(a){
        this.$emit('settlement',a)
      }
    }
  }
</script>
<style scoped>
  .head{position: fixed;top:0;z-index: 10;width:100%}
  .xheader{width:100%;background-color: white;}

  .head >>> .vux-header .vux-header-title{font-size: 0.36rem;color:#111;}
  .head >>> .vux-header .vux-header-left .left-arrow:before{border-color:#111;}
  .vux-header .vux-header-right .titleRight{font-size: 0.28rem;color:#f86e0e}

  /*底部*/
  .shop_footer{height:1.2rem;width:100%;position: fixed;bottom: 0;display: flex;justify-content: space-between;box-shadow:0 0 6px #bfbfbf;}
  .shop_footer .footer1{width:100%;height: 100%;display: flex;}
  .shop_footer .L{width:5.5rem;height: 100%;padding:0.4rem 0.33rem;box-sizing: border-box;background-color: white;}
  .shop_footer .L .img{width:0.4rem;height: 0.4rem;margin-right: 0.36rem;vertical-align: bottom;}
  .shop_footer .L .s1{font-size: 0.3rem;color:#666;}
  .shop_footer .L .l{font-size: 0.3rem;float: right;color:#f86e0e}
  .shop_footer .L .s2{font-size: 0.3rem;float: right;color:#333;}
  .shop_footer .R{width:2rem;height: 100%;background-color: #f86e0e;text-align:center;line-height: 1.2rem;}
  .shop_footer .R .s3{font-size: 0.3rem;color:white;}

  .footer2{width:100%;box-sizing: border-box;padding: 0.2rem;background-color: white;}
  .footer2 .img2{width:0.4rem;height: 0.4rem;vertical-align: bottom;margin:0.2rem 0.36rem 0.2rem 0.13rem;}
  .footer2 .s4{display:inline-block;padding:0.2rem 0;font-size: 0.3rem;color:#666;}
  .footer2 .s5{display:inline-block;float:right;width:2rem;height: 0.8rem;line-height:0.8rem;font-size:0.3rem;color:white;border-radius: 0.4rem;background: linear-gradient(to right,#f86e0e, #f15352);text-align: center;box-shadow: 0 0 10px #999;}
</style>
