<template>
  <div class="refundMoney">
    <div class="line1"><span class="s1">退款金额：</span><span class="s2">￥{{datas.money}}</span> </div>
    <div class="line1"><span class="s1">退款状态：</span><span class="s2">{{datas.type}}</span> </div>
    <div class="line2">{{datas.word}}</div>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    props:{
      datas:{
        type:Object,
        default:()=>{
          return{
            'money':100.00,
            'type':'退款中',
            'word':'剩余2天21:20:20商家处理',

//            'type':'退款失败',
//            'word':'拒绝理由：由于最近快递大量投放，发送不及时，希望您能够理解',

//            'type':'退款成功',
//            'word':'2017-3-3 09:30:30',
          }
        }
      }
    }
  }
</script>
<style scoped>
  .refundMoney{width:100%;height: 2.6rem;padding:0.3rem 0.2rem;box-sizing: border-box;}

  .line1{font-size: 0.3rem;line-height: 0.5rem;}
  .line1 .s1{color:#3c3c3c;}
  .line1 .s2{color:#f86e0e;float: right;}

  .line2{font-size: 0.24rem;color:#9a9a9a;line-height: 0.5rem;}


</style>
