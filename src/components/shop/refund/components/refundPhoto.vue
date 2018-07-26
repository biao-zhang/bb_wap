<template>
  <div class="refundPhoto">
    <div class="line1"><span class="s1">退款图片：</span> </div>

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
  .refundPhoto{width:100%;height:2.26rem;padding:0.3rem 0.2rem;box-sizing: border-box;}

  .line1{width:100%;margin-bottom:0.1rem;}
  .line1 .s1{font-size: 0.3rem;color:#3c3c3c;}

</style>
