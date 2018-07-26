<template>
  <div class="refundExplain">
    <div class="line1"><span class="s1">退款说明：</span> </div>
    <x-textarea class="textarea" :placeholder="placeHolder" :max="140"></x-textarea>
  </div>
</template>
<script>
  import {XTextarea } from 'vux'
  export default {
    data(){
      return{
        placeHolder:'商品有瑕疵!!!',

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
    },
    components:{XTextarea}
  }
</script>
<style scoped>
  .refundExplain{width:100%;padding:0.3rem 0.2rem;box-sizing: border-box;}

  .line1{width:100%;margin-bottom:0.1rem;}
  .line1 .s1{font-size: 0.3rem;color:#3c3c3c;}

  .textarea{padding:0;text-indent: 2em;font-size: 0.3rem;color:#999;line-height: 0.4rem;}

  .weui-cell:before{border-top:0;}
</style>
