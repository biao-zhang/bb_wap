<template>
  <div class='cartShopItem'>
    <div class="radioBox">
      <img @click="changeRadio" v-if="datas.isCheck==1?true:false" src="../../img/cartRadioTrue.png" class="radio"/>
      <img @click="changeRadio" v-if="datas.isCheck==0?true:false" src="../../img/cartRadioFalse.png" class="radio"/>
    </div>
    <div class="portraitBox">
      <img :src="datas.goodsImgMaster" class="portrait"/>
    </div>
    <div class="summary">
      <div class="line1 re-twoLineOverFlow">{{datas.goodsName}}</div>
      <div class="line2"><span v-if="datas.goodsSpecs!=''">规格: {{datas.goodsSpecs}}</span></div>
      <div class="line3">￥{{datas.goodsPrice}}</div>
      <div class="line4">
        <div style='display: inline-block'>
          <sel-number :min="1" :max="datas.stockNum" :value="datas.buyNum" @changeNum="changeNum"></sel-number>
        </div>
        <span class="s1">库存：{{datas.stockNum}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * @props
   * @emit
   */

  import selNumber from '@/components/common/selNumber'

  export default{
    data(){
      return{

      }
    },
    components:{selNumber},
    props:{
      datas:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      index:{
        default:0
      }
    },
    mounted(){

    },
    methods:{
      changeRadio(){
        this.$emit("itemRadioState",this.datas.cartId,this.datas.isCheck)
      },
      changeNum(a){
        this.$emit('changeNum',this.datas.cartId,a)
      }
    },
  }
</script>
<style scoped>
.cartShopItem{margin:0 0.2rem;padding:0.15rem 0;border-bottom:1px solid #ededed;height: 2.4rem;display:flex;justify-content:space-between;}
  .radioBox{width:0.4rem;height:100%;display:flex;overflow: hidden;justify-content: center;flex-direction: column;margin-left: 0.1rem;}
  .radioBox .radio{width:0.4rem;height: 0.4rem;}
  .portraitBox{width:2.4rem;height: 2.4rem;vertical-align: middle;margin-left: 0.4rem;margin-right: 0.3rem;}
  .portraitBox .portrait{width:100%;height: 100%;}
  .summary{width:3.47rem;height: 100%;}
  .summary .line1{width: 100%;height: 0.75rem;font-size: 0.3rem;color:#3c3c3c;line-height: 0.4rem;}
  .summary .line2{width: 100%;font-size: 0.24rem;color:#9a9a9a;line-height: 0.53rem;height: 0.53rem;}
  .summary .line3{width: 100%;font-size: 0.3rem;color:#f86e0e;line-height: 0.6rem;}
.summary .line4 >>> svg{width:9px;}
.summary .line4 >>> .vux-number-selector svg{fill:#f86e0e}
.summary .line4 >>> .vux-number-selector.vux-number-disabled svg{fill:#ccc}
  .summary .line4 .s1{font-size: 0.24rem;color:#9a9a9a;line-height: 0.5rem;float: right}
</style>
