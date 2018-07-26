<template>
  <div class="refundTime">
    <div class="line1">申请时间：2017-2-5 08:20</div>
    <div class="line1">退快编号：1564254625352</div>
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
          return {
            "name":'2017没事咯累了乐乐死爱而家飞啊飞撒啊威锋网撒死',
            "type":'awe分啊王菲菲阿色色色方式份额个啊分哇违法哥哥哥仨哇微风是',
            "number":1,
          }
        }
      }
    }
  }
</script>
<style scoped>
  .refundTime{width:100%;height:1.25rem;padding:0.3rem 0.2rem;box-sizing: border-box;}

  .line1{font-size: 0.24rem;color:#9a9a9a;}

</style>
