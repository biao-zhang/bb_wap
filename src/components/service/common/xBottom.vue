<template>
  <div class="bot">
    <div class="bb_pageBottom" >
      <div class="total" v-if="datas.id!=undefined">
        费用 <span class="price" @click="changeMaskState">{{datas.money}}<img class="morePrice" src="../img/next.png"/></span> 元起
      </div>
      <span class="reper" @click="sub">提交</span>
    </div>
    <div class="mask" v-if="maskState">
      <mask-box @cloMask2="cloMask">
          <cost-detail @cloMask1="cloMask" :datas="datas"></cost-detail>
      </mask-box>
    </div>
  </div>
</template>
<script>
  import maskBox from '@/components/common/maskBox'
  import costDetail from '@/components/service/common/costDetail'

  export default {
    data(){
      return{
        maskState:false,
      }
    },
    components:{maskBox,costDetail},
    props:{
      serviceType:{
        type:String,
        default:'a'
      },
      datas:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    mounted(){

    },
    methods:{
      changeMaskState(){
        this.maskState = true;
      },
      cloMask(){
        this.maskState=false;
      },
//      点击提交
      sub(){
//        var datas = this.$store.state.service[this.serviceType]
//        console.log(datas,this.serviceType)
        this.$emit('submit')
      }
    }
  }
</script>
<style scoped>

  .bot{position: absolute;bottom: 0;z-index: 10;width:100%;}
  /*提交*/
  .bb_pageBottom{width:100%;height: 1rem;background-color: white;}
  .bb_pageBottom .total{height: 0.3rem;padding:0.35rem;line-height: 0.3rem;font-size: 0.3rem;color:#333;float:left}
  .bb_pageBottom .total .price{color:#f86e0e;}
  .bb_pageBottom .total .morePrice{width:0.1rem;margin-left:5px;}
  .bb_pageBottom .reper{width:1.6rem;height: 0.76rem;background-color: #f86e0e;color:white;font-size: 0.3rem;text-align: center;line-height: 0.76rem;border-radius: 0.05rem;float: right;margin:0.12rem 0.2rem;}
</style>
